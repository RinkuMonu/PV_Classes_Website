export default function ScorePanel({ score, difficulty, accuracy }) {
  // Difficulty color mapping
  const diffColors = {
    easy: "bg-green-100 text-green-800 border-green-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    hard: "bg-red-100 text-red-800 border-red-200"
  };

  const diffBadge = diffColors[difficulty?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";

  return (
    <div className="flex gap-4 justify-end items-center mb-6">
      <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border shadow-sm ${diffBadge}`}>
        Level: {difficulty}
      </div>
      
      <div className="bg-[#00316B] text-white px-4 py-1.5 rounded-lg font-bold shadow-md flex items-center">
        <span className="text-xs uppercase tracking-wide opacity-80 mr-2">Score</span>
        <span className="text-lg">{score}</span>
      </div>
    </div>
  );
}
