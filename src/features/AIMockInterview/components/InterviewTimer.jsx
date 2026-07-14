export default function InterviewTimer({ timeLeft, totalTime }) {
  const percentage = Math.max(0, (timeLeft / totalTime) * 100);
  
  // Color coding based on time left
  let color = "bg-green-500";
  if (percentage <= 50) color = "bg-yellow-500";
  if (percentage <= 20) color = "bg-red-500";

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-2xl font-bold font-mono tracking-wider ${percentage <= 20 ? 'text-red-600 animate-pulse' : 'text-gray-800'}`}>
        {formatTime(timeLeft)}
      </div>
      <div className="w-full bg-gray-200 h-2 mt-2 rounded-full overflow-hidden">
        <div 
          className={`h-full ${color} transition-all duration-1000 ease-linear`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
