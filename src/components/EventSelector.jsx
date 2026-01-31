import { Calendar, ChevronDown } from 'lucide-react';
import { useTeamEvents } from '../hooks/useRobotEvents';
import { formatDate, cn } from '../lib/utils';

export function EventSelector({ selectedEvent, onSelectEvent, className }) {
  const { data: events, isLoading } = useTeamEvents();

  // Sort events by date (most recent first)
  const sortedEvents = events?.sort((a, b) => 
    new Date(b.start) - new Date(a.start)
  ) || [];

  if (isLoading) {
    return (
      <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4", className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4", className)}>
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
        <Calendar className="w-4 h-4 inline mr-1" />
        Select Event
      </label>
      <div className="relative">
        <select
          value={selectedEvent?.id || ''}
          onChange={(e) => {
            const event = sortedEvents.find(ev => ev.id === parseInt(e.target.value));
            onSelectEvent(event);
          }}
          className="w-full appearance-none bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-4 py-2.5 pr-10 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
        >
          <option value="">Choose an event...</option>
          {sortedEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {formatDate(event.start)} - {event.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
      {selectedEvent && (
        <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="font-medium text-blue-900 dark:text-blue-100">{selectedEvent.name}</p>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            {formatDate(selectedEvent.start)} • {selectedEvent.location?.city}, {selectedEvent.location?.region}
          </p>
        </div>
      )}
    </div>
  );
}
