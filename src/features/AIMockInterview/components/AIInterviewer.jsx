import { INTERVIEW_STATUS } from '../constants/interviewConstants';
import HumanAvatarStage from '../avatar/components/HumanAvatarStage';

export default function AIInterviewer({ status, isCorrect = null }) {
  return (
    <div className="w-full shadow-inner rounded-2xl bg-white overflow-hidden">
      <HumanAvatarStage status={status} isCorrect={isCorrect} />
    </div>
  );
}
