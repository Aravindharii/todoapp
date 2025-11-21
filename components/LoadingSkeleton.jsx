export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => {
        const delay = index * 0.1;
        
        return (
          <div
            key={index}
            className="group relative rounded-xl bg-white border-2 border-gray-100 hover:border-blue-200 shadow-sm hover:shadow-lg transition-all duration-500 overflow-hidden"
            style={{ animationDelay: `${delay}s` }}
          >
            {/* Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-50/50 to-transparent animate-shimmer" />
            
            {/* Top colored bar with pulse */}
            <div className="h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 animate-pulse-slow" />
            
            <div className="p-6 relative">
              {/* Icon and Title Section */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 animate-pulse" 
                     style={{ animationDelay: `${delay}s` }} 
                />
                <div className="flex-1 space-y-2">
                  <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-3/4 animate-pulse"
                       style={{ animationDelay: `${delay + 0.1}s` }}
                  />
                  <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-1/2 animate-pulse"
                       style={{ animationDelay: `${delay + 0.2}s` }}
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="mb-4">
                <div className="inline-flex h-7 bg-gradient-to-r from-gray-200 to-gray-100 rounded-full w-24 animate-pulse"
                     style={{ animationDelay: `${delay + 0.3}s` }}
                />
              </div>
              
              {/* Description Lines */}
              <div className="space-y-2 mb-4">
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-full animate-pulse"
                     style={{ animationDelay: `${delay + 0.4}s` }}
                />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-5/6 animate-pulse"
                     style={{ animationDelay: `${delay + 0.5}s` }}
                />
                <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-4/6 animate-pulse"
                     style={{ animationDelay: `${delay + 0.6}s` }}
                />
              </div>

              {/* Footer with timestamp */}
              <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mb-4">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse"
                     style={{ animationDelay: `${delay + 0.7}s` }}
                />
                <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded w-32 animate-pulse"
                     style={{ animationDelay: `${delay + 0.8}s` }}
                />
              </div>
              
              {/* Action Buttons with hover effect */}
              <div className="flex gap-3">
                <div className="flex-1 h-11 bg-gradient-to-r from-blue-200 to-blue-100 rounded-lg animate-pulse relative overflow-hidden group-hover:shadow-md transition-shadow"
                     style={{ animationDelay: `${delay + 0.9}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow" />
                </div>
                <div className="flex-1 h-11 bg-gradient-to-r from-red-200 to-red-100 rounded-lg animate-pulse relative overflow-hidden group-hover:shadow-md transition-shadow"
                     style={{ animationDelay: `${delay + 1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer-slow" />
                </div>
              </div>

              {/* Floating dots animation */}
              <div className="absolute top-4 right-4 flex gap-1">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"
                     style={{ animationDelay: `${delay}s` }}
                />
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                     style={{ animationDelay: `${delay + 0.2}s` }}
                />
                <div className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"
                     style={{ animationDelay: `${delay + 0.4}s` }}
                />
              </div>
            </div>
          </div>
        );
      })}
      
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-shimmer-slow {
          animation: shimmer-slow 3s infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
