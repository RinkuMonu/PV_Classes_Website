import { INTERVIEW_STATUS } from '../constants/interviewConstants';
import AvatarCanvas from '../avatar/components/AvatarCanvas';

export default function AIInterviewer({ status, isCorrect = null }) {
  return (
    <div className="w-full shadow-inner rounded-2xl bg-white overflow-hidden min-h-[400px]">
      <AvatarCanvas status={status} />
    </div>
  );
}
