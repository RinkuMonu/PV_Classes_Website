export default function InterviewProgress({ current, total }) {
  const percentage = Math.min(100, Math.max(0, ((current - 1) / total) * 100));

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center text-sm font-bold text-gray-500 mb-2 uppercase tracking-wide">
        <span>Question {current} of {total}</span>
        <span>{Math.round(percentage)}% Completed</span>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div 
          className="h-full bg-[#009FE3] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
