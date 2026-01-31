import { MapPin, School, Users, Trophy } from 'lucide-react';
import { useTeam } from '../hooks/useRobotEvents';
import { cn } from '../lib/utils';

export function Header({ className }) {
  const { data: team, isLoading } = useTeam();

  if (isLoading) {
    return (
      <header className={cn("bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6", className)}>
        <div className="max-w-6xl mx-auto animate-pulse">
          <div className="h-10 bg-white/20 rounded w-64 mb-2"></div>
          <div className="h-6 bg-white/20 rounded w-48"></div>
        </div>
      </header>
    );
  }

  return (
    <header className={cn("bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6", className)}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3">
            <Trophy className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{team?.number}</h1>
            <p className="text-white/90 text-lg">{team?.team_name}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <School className="w-4 h-4" />
            <span>{team?.organization}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <MapPin className="w-4 h-4" />
            <span>{team?.location?.city}, {team?.location?.region}</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5">
            <Users className="w-4 h-4" />
            <span>{team?.grade}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
