import { useTeamMatches } from '../hooks/useRobotEvents';
import { getRoundName, cn } from '../lib/utils';
import { TEAM_ID } from '../lib/api';

function MatchCard({ match }) {
  const isTeamRed = match.alliances?.some(
    a => a.color === 'red' && a.teams?.some(t => t.team?.id === TEAM_ID)
  );
  const isTeamBlue = match.alliances?.some(
    a => a.color === 'blue' && a.teams?.some(t => t.team?.id === TEAM_ID)
  );
  
  const redAlliance = match.alliances?.find(a => a.color === 'red');
  const blueAlliance = match.alliances?.find(a => a.color === 'blue');
  
  const redScore = redAlliance?.score ?? '-';
  const blueScore = blueAlliance?.score ?? '-';
  
  const isScored = redAlliance?.score !== undefined && redAlliance?.score !== null;
  const teamWon = isScored && (
    (isTeamRed && redScore > blueScore) || 
    (isTeamBlue && blueScore > redScore)
  );
  const teamLost = isScored && (
    (isTeamRed && redScore < blueScore) || 
    (isTeamBlue && blueScore < redScore)
  );
  const isTie = isScored && redScore === blueScore;

  return (
    <div className={cn(
      "bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4",
      teamWon && "border-l-green-500",
      teamLost && "border-l-red-500",
      isTie && "border-l-yellow-500",
      !isScored && "border-l-gray-300 dark:border-l-gray-600"
    )}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {getRoundName(match.round)} {match.matchnum}
        </span>
        {isScored && (
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full font-medium",
            teamWon && "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            teamLost && "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            isTie && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          )}>
            {teamWon ? 'WIN' : teamLost ? 'LOSS' : 'TIE'}
          </span>
        )}
      </div>
      
      <div className="space-y-2">
        {/* Red Alliance */}
        <div className={cn(
          "flex justify-between items-center p-2 rounded",
          isTeamRed ? "bg-red-100 dark:bg-red-900/30" : "bg-gray-50 dark:bg-gray-700/50"
        )}>
          <div className="flex gap-2 text-sm">
            {redAlliance?.teams?.map((t, i) => (
              <span 
                key={i} 
                className={cn(
                  "font-mono",
                  t.team?.id === TEAM_ID && "font-bold text-red-600 dark:text-red-400"
                )}
              >
                {t.team?.name}
              </span>
            ))}
          </div>
          <span className="font-bold text-lg text-red-600 dark:text-red-400">{redScore}</span>
        </div>
        
        {/* Blue Alliance */}
        <div className={cn(
          "flex justify-between items-center p-2 rounded",
          isTeamBlue ? "bg-blue-100 dark:bg-blue-900/30" : "bg-gray-50 dark:bg-gray-700/50"
        )}>
          <div className="flex gap-2 text-sm">
            {blueAlliance?.teams?.map((t, i) => (
              <span 
                key={i}
                className={cn(
                  "font-mono",
                  t.team?.id === TEAM_ID && "font-bold text-blue-600 dark:text-blue-400"
                )}
              >
                {t.team?.name}
              </span>
            ))}
          </div>
          <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{blueScore}</span>
        </div>
      </div>
    </div>
  );
}

export function MatchList({ eventId, divisionId, className }) {
  const { data: matches, isLoading, isFetching } = useTeamMatches(eventId, divisionId);

  if (!eventId || !divisionId) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <p className="text-gray-500 dark:text-gray-400 text-center">Select an event to view matches</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  // Sort matches by round and match number
  const sortedMatches = [...(matches || [])].sort((a, b) => {
    if (a.round !== b.round) return a.round - b.round;
    return a.matchnum - b.matchnum;
  });

  // Group by round
  const groupedMatches = sortedMatches.reduce((acc, match) => {
    const round = getRoundName(match.round);
    if (!acc[round]) acc[round] = [];
    acc[round].push(match);
    return acc;
  }, {});

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Match Results</h2>
        {isFetching && (
          <span className="text-xs text-blue-500 animate-pulse">Updating...</span>
        )}
      </div>
      
      {sortedMatches.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">No matches found for this event</p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedMatches).map(([round, roundMatches]) => (
            <div key={round}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                {round}
              </h3>
              <div className="grid gap-3 md:grid-cols-2">
                {roundMatches.map((match) => (
                  <MatchCard key={match.id} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
