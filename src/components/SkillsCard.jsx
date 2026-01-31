import { useEventSkills } from '../hooks/useRobotEvents';
import { cn } from '../lib/utils';
import { TEAM_ID } from '../lib/api';
import { Gamepad2, Code, Zap } from 'lucide-react';

export function SkillsCard({ eventId, className }) {
  const { data: skills, isLoading, isFetching } = useEventSkills(eventId);

  if (!eventId) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <p className="text-gray-500 dark:text-gray-400 text-center">Select an event to view skills</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
          <div className="grid grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Calculate best scores per team
  const teamScores = {};
  skills?.forEach(skill => {
    const teamId = skill.team?.id;
    if (!teamId) return;
    
    if (!teamScores[teamId]) {
      teamScores[teamId] = {
        team: skill.team,
        driver: 0,
        programming: 0,
      };
    }
    
    if (skill.type === 'driver' && skill.score > teamScores[teamId].driver) {
      teamScores[teamId].driver = skill.score;
    }
    if (skill.type === 'programming' && skill.score > teamScores[teamId].programming) {
      teamScores[teamId].programming = skill.score;
    }
  });

  // Add combined scores and sort
  const rankedSkills = Object.values(teamScores)
    .map(t => ({ ...t, combined: t.driver + t.programming }))
    .sort((a, b) => b.combined - a.combined);

  // Find team's rank
  const teamIndex = rankedSkills.findIndex(t => t.team?.id === TEAM_ID);
  const teamSkills = rankedSkills[teamIndex];

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Skills Challenge</h2>
        {isFetching && (
          <span className="text-xs text-blue-500 animate-pulse">Updating...</span>
        )}
      </div>

      {!teamSkills ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No skills scores recorded</p>
      ) : (
        <>
          {/* Team's scores highlight */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-4 text-white mb-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Your Skills Rank</span>
              <span className="text-2xl font-bold">#{teamIndex + 1}</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <Gamepad2 className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <div className="text-2xl font-bold">{teamSkills.driver}</div>
                <div className="text-xs opacity-80">Driver</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <Code className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <div className="text-2xl font-bold">{teamSkills.programming}</div>
                <div className="text-xs opacity-80">Programming</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 text-center">
                <Zap className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <div className="text-2xl font-bold">{teamSkills.combined}</div>
                <div className="text-xs opacity-80">Combined</div>
              </div>
            </div>
          </div>

          {/* Skills leaderboard */}
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
            Event Leaderboard
          </h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {rankedSkills.slice(0, 10).map((entry, idx) => (
              <div 
                key={entry.team?.id}
                className={cn(
                  "flex items-center justify-between p-2 rounded-lg",
                  entry.team?.id === TEAM_ID 
                    ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                    : "bg-gray-50 dark:bg-gray-700/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn(
                    "w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold",
                    idx === 0 && "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
                    idx === 1 && "bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-200",
                    idx === 2 && "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
                    idx > 2 && "text-gray-500 dark:text-gray-400"
                  )}>
                    {idx + 1}
                  </span>
                  <span className={cn(
                    "font-mono",
                    entry.team?.id === TEAM_ID && "font-bold text-blue-600 dark:text-blue-400"
                  )}>
                    {entry.team?.name}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {entry.driver} + {entry.programming}
                  </span>
                  <span className="font-bold w-12 text-right">{entry.combined}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
