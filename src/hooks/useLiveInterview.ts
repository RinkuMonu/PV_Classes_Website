import { useState, useCallback, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { liveInterviewApi } from '../services/liveInterviewApi';
import { useWebSocket } from './useWebSocket';
import { 
  LiveInterviewStartRequest, 
  LiveInterviewStartResponse,
  CandidateProfile,
  InterviewMetrics
} from '../types/api';

const WS_BASE_URL = 'ws://localhost:8000';

export interface LiveInterviewState {
  sessionId: string | null;
  status: string;
  transcript: string;
  currentQuestion: string;
  difficulty: string;
  candidateProfile: CandidateProfile | null;
  metrics: InterviewMetrics | null;
  audioUrl: string | null;
  isAvatarSpeaking: boolean;
  avatarState: any;
}

export const useLiveInterview = () => {
  const [interviewState, setInterviewState] = useState<LiveInterviewState>({
    sessionId: null,
    status: 'INITIALIZING',
    transcript: '',
    currentQuestion: 'Initializing...',
    difficulty: 'Medium',
    candidateProfile: null,
    metrics: null,
    audioUrl: null,
    isAvatarSpeaking: false,
    avatarState: null
  });

  const wsUrl = interviewState.sessionId 
    ? `${WS_BASE_URL}/api/v1/interview-session/ws/${interviewState.sessionId}` 
    : '';

  const {
    isConnected,
    latency,
    sendMessage,
    disconnect
  } = useWebSocket({
    url: wsUrl,
    onMessage: (event) => {
      switch (event.type) {
        case 'transcript_update':
          setInterviewState(prev => ({ ...prev, transcript: event.payload.transcript }));
          break;
        case 'question_text':
          setInterviewState(prev => ({ ...prev, currentQuestion: event.payload.question }));
          break;
        case 'metrics_update':
          setInterviewState(prev => ({ ...prev, metrics: event.payload.metrics }));
          break;
        case 'avatar_state':
          setInterviewState(prev => ({ ...prev, avatarState: event.payload, isAvatarSpeaking: event.payload.isSpeaking }));
          break;
        case 'audio_stream':
          setInterviewState(prev => ({ ...prev, audioUrl: event.payload.audioUrl }));
          break;
        case 'interview_status':
          setInterviewState(prev => ({ ...prev, status: event.payload.status }));
          break;
        default:
          console.log('Unhandled WebSocket event:', event);
      }
    },
    onError: (err) => {
      console.warn('LiveInterview WS Error (transient):', err);
      // Don't set status to ERROR - let reconnection handle recovery
    }
  });

  const startSessionMutation = useMutation({
    mutationFn: (data: LiveInterviewStartRequest) => liveInterviewApi.startSession(data),
    onSuccess: (data: LiveInterviewStartResponse) => {
      setInterviewState(prev => ({
        ...prev,
        sessionId: data.session_id,
        status: data.status,
        currentQuestion: data.first_question || prev.currentQuestion,
        audioUrl: data.audio_url || null,
        difficulty: data.candidate?.difficulty || 'Medium',
        candidateProfile: {
          name: data.candidate?.name || 'Candidate',
          target_exam: data.candidate?.exam,
          subject: data.candidate?.subject,
          communication_level: 'Medium',
          confidence_level: 'Medium',
        }
      }));
    }
  });

  const startInterview = useCallback((config: LiveInterviewStartRequest) => {
    startSessionMutation.mutate(config);
  }, [startSessionMutation]);

  const endInterview = useCallback(() => {
    disconnect();
    setInterviewState(prev => ({ ...prev, status: 'COMPLETED' }));
  }, [disconnect]);

  const recognitionRef = useRef<any>(null);

  const submitAnswer = useCallback(async (answerText: string) => {
    if (!interviewState.sessionId || !answerText.trim()) return;
    
    setInterviewState(prev => ({ ...prev, status: 'PROCESSING', transcript: 'Evaluating your answer...' }));
    
    try {
      const response = await liveInterviewApi.submitAnswer({
        session_id: interviewState.sessionId,
        answer_text: answerText,
      });
      
      setInterviewState(prev => ({
        ...prev,
        status: 'READY',
        currentQuestion: response.next_question,
        difficulty: response.current_difficulty,
        audioUrl: response.audio_url || null,
        transcript: '',
        candidateProfile: response.candidate_profile || prev.candidateProfile,
        metrics: response.metrics || prev.metrics,
      }));
    } catch (err) {
      console.error('Answer submission failed:', err);
      setInterviewState(prev => ({ ...prev, status: 'READY', transcript: 'Failed to process answer. Try again.' }));
    }
  }, [interviewState.sessionId]);

  const startRecording = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error('Web Speech API not supported');
      setInterviewState(prev => ({ ...prev, transcript: 'Speech recognition not supported in this browser.' }));
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-IN'; // Hindi-English mix support

    let finalTranscript = '';

    recognition.onresult = (event: any) => {
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + ' ';
        } else {
          interim += event.results[i][0].transcript;
        }
      }
      setInterviewState(prev => ({ ...prev, transcript: finalTranscript + interim }));
    };

    recognition.onerror = (event: any) => {
      if (event.error === 'aborted') return;
      console.log('Speech recognition error:', event.error);
      setInterviewState(prev => ({ ...prev, transcript: 'Could not hear you. Please try again.' }));
    };

    recognition.onend = () => {
      // Auto-submit when recognition ends (user clicked stop)
      if (finalTranscript.trim()) {
        submitAnswer(finalTranscript.trim());
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setInterviewState(prev => ({ ...prev, status: 'RECORDING', transcript: '' }));
  }, [submitAnswer]);

  const stopRecording = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  }, []);

  return {
    interviewState,
    startInterview,
    endInterview,
    startRecording,
    stopRecording,
    submitAnswer,
    isConnected,
    latency,
    isLoading: startSessionMutation.isPending,
    error: startSessionMutation.error
  };
};
