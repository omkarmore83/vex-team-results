import { RefreshCw, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export function LiveIndicator({ isLive, lastUpdated, className }) {
  return (
    <div className={cn(
      "flex items-center gap-2 text-sm",
      className
    )}>
      {isLive ? (
        <>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-green-600 dark:text-green-400 font-medium">Live</span>
        </>
      ) : (
        <>
          <RefreshCw className="w-4 h-4 text-gray-400 animate-spin" />
          <span className="text-gray-500 dark:text-gray-400">Updating...</span>
        </>
      )}
      {lastUpdated && (
        <span className="text-gray-400 dark:text-gray-500 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {new Date(lastUpdated).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}
