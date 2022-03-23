export default function ProgressBar({ percentage, income }) {
  const bgColor = income ? 'bg-gradient-to-r from-sky-500 to-indigo-500'
  : percentage > 75 ? 'bg-gradient-to-r from-red-400 to-pink-500'
  : percentage > 50 ? 'bg-gradient-to-r from-amber-500 to-yellow-500'
  : 'bg-gradient-to-r from-teal-500 to-emerald-500';
  return (
    <div className="bg-gray-200 rounded-full w-full h-5 relative overflow-hidden">
      <div
        className={`absolute inset-0 ${bgColor} transition-all duration-300`}
        style={{ width: `${percentage}%` }} />
    </div>
  )
}
