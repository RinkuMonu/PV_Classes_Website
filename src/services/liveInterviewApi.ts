import { apiClient } from './apiClient';
import { 
  LiveInterviewStartRequest, 
  LiveInterviewStartResponse,
  LiveInterviewAnswerRequest,
  LiveInterviewAnswerResponse,
  VoiceStateResponse
} from '../types/api';

export const liveInterviewApi = {
  startSession: async (data: LiveInterviewStartRequest): Promise<LiveInterviewStartResponse> => {
    const response = await apiClient.post<LiveInterviewStartResponse>('/api/live-interview/start', data);
    return response.data;
  },

  submitAnswer: async (data: LiveInterviewAnswerRequest): Promise<LiveInterviewAnswerResponse> => {
    const response = await apiClient.post<LiveInterviewAnswerResponse>('/api/live-interview/answer', data);
    return response.data;
  },

  processVoiceAnswer: async (sessionId: string, audioBlob: Blob): Promise<VoiceStateResponse> => {
    const formData = new FormData();
    formData.append('file', audioBlob, 'answer.webm');
    const response = await apiClient.post<VoiceStateResponse>(
      `/api/live-interview/session/${sessionId}/voice`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    return response.data;
  }
};
