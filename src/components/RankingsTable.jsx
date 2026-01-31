import { useEventRankings } from '../hooks/useRobotEvents';
import { cn } from '../lib/utils';
import { TEAM_ID } from '../lib/api';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function RankingsTable({ eventId, divisionId, className }) {
  const { data: rankings, isLoading, isFetching } = useEventRankings(eventId, divisionId);

  if (!eventId || !divisionId) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <p className="text-gray-500 dark:text-gray-400 text-center">Select an event to view rankings</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <div className="animate-pulse space-y-2">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Sort by rank
  const sortedRankings = [...(rankings || [])].sort((a, b) => a.rank - b.rank);

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rankings</h2>
        {isFetching && (
          <span className="text-xs text-blue-500 animate-pulse">Updating...</span>
        )}
      </div>

      {sortedRankings.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No rankings available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-700">
                <th className="pb-2 font-medium">Rank</th>
                <th className="pb-2 font-medium">Team</th>
                <th className="pb-2 font-medium text-right">W-L-T</th>
                <th className="pb-2 font-medium text-right">WP</th>
                <th className="pb-2 font-medium text-right">AP</th>
                <th className="pb-2 font-medium text-right">SP</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-gray-700">
              {sortedRankings.map((ranking) => {
                const isTeam = ranking.team?.id === TEAM_ID;
                return (
                  <tr 
                    key={ranking.id}
                    className={cn(
                      "transition-colors",
                      isTeam && "bg-blue-50 dark:bg-blue-900/20"
                    )}
                  >
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "font-bold text-lg w-8 h-8 flex items-center justify-center rounded-full",
                          ranking.rank === 1 && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                          ranking.rank === 2 && "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200",
                          ranking.rank === 3 && "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
                          ranking.rank > 3 && "text-gray-600 dark:text-gray-400"
                        )}>
                          {ranking.rank}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className={cn(
                        "font-mono font-medium",
                        isTeam && "text-blue-600 dark:text-blue-400 font-bold"
                      )}>
                        {ranking.team?.name}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className="font-medium">
                        <span className="text-green-600 dark:text-green-400">{ranking.wins}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-red-600 dark:text-red-400">{ranking.losses}</span>
                        <span className="text-gray-400">-</span>
                        <span className="text-yellow-600 dark:text-yellow-400">{ranking.ties}</span>
                      </span>
                    </td>
                    <td className="py-3 text-right font-medium">{ranking.wp}</td>
                    <td className="py-3 text-right text-gray-600 dark:text-gray-400">{ranking.ap}</td>
                    <td className="py-3 text-right text-gray-600 dark:text-gray-400">{ranking.sp}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
