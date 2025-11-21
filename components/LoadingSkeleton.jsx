export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="rounded-2xl bg-gradient-to-br from-blue-100/60 via-purple-100/60 to-pink-100/60 p-[1px] shadow-lg shadow-blue-100/60 animate-pulse"
        >
          <div className="rounded-2xl bg-white/80 backdrop-blur-sm p-5">
            <div className="flex justify-between items-start mb-4">
              <div className="h-6 rounded w-3/4 bg-slate-200/80 shimmer" />
              <div className="h-6 rounded-full w-20 bg-slate-200/80 shimmer" />
            </div>
            <div className="space-y-3 mb-5">
              <div className="h-4 rounded bg-slate-200/80 shimmer" />
              <div className="h-4 rounded bg-slate-200/70 w-5/6 shimmer" />
            </div>
            <div className="h-3 rounded bg-slate-200/70 w-1/3 mb-5 shimmer" />
            <div className="flex gap-3">
              <div className="flex-1 h-11 rounded-xl bg-slate-200/80 shimmer" />
              <div className="flex-1 h-11 rounded-xl bg-slate-200/80 shimmer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
