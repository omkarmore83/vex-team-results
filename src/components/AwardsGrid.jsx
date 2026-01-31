import { useTeamAwards } from '../hooks/useRobotEvents';
import { cn } from '../lib/utils';
import { Trophy, Award, Medal, Star } from 'lucide-react';

const awardIcons = {
  'Excellence': Trophy,
  'Tournament Champion': Trophy,
  'Tournament Finalist': Medal,
  'Design': Star,
  'Robot Skills Champion': Award,
  'default': Award,
};

const awardColors = {
  'Excellence': 'from-yellow-400 to-amber-500',
  'Tournament Champion': 'from-yellow-400 to-amber-500',
  'Tournament Finalist': 'from-gray-300 to-gray-400',
  'Design': 'from-purple-400 to-pink-500',
  'Robot Skills Champion': 'from-blue-400 to-cyan-500',
  'default': 'from-blue-400 to-indigo-500',
};

function getAwardType(name) {
  for (const key of Object.keys(awardIcons)) {
    if (key !== 'default' && name?.toLowerCase().includes(key.toLowerCase())) {
      return key;
    }
  }
  return 'default';
}

export function AwardsGrid({ eventId, className }) {
  const { data: awards, isLoading } = useTeamAwards(eventId);

  if (!eventId) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <p className="text-gray-500 dark:text-gray-400 text-center">Select an event to view awards</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2].map(i => (
              <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6", className)}>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Awards</h2>

      {(!awards || awards.length === 0) ? (
        <div className="text-center py-8">
          <Trophy className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-2" />
          <p className="text-gray-500 dark:text-gray-400">No awards at this event</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {awards.map((award) => {
            const type = getAwardType(award.title);
            const Icon = awardIcons[type];
            const colorClass = awardColors[type];
            
            return (
              <div 
                key={award.id}
                className="relative overflow-hidden rounded-xl bg-gradient-to-br p-4 text-white"
                style={{
                  background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                }}
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-90", colorClass)}></div>
                <div className="relative">
                  <Icon className="w-8 h-8 mb-2 opacity-90" />
                  <h3 className="font-bold text-lg leading-tight">{award.title}</h3>
                  {award.qualifications?.length > 0 && (
                    <p className="text-sm opacity-80 mt-1">
                      Qualifies for: {award.qualifications.map(q => q.name).join(', ')}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
