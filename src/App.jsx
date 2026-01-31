import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider, useIsFetching } from '@tanstack/react-query';
import { Header } from './components/Header';
import { EventSelector } from './components/EventSelector';
import { MatchList } from './components/MatchList';
import { RankingsTable } from './components/RankingsTable';
import { SkillsCard } from './components/SkillsCard';
import { AwardsGrid } from './components/AwardsGrid';
import { LiveIndicator } from './components/LiveIndicator';
import { ThemeToggle } from './components/ThemeToggle';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  const [lastUpdated, setLastUpdated] = useState(null);
  
  const isFetching = useIsFetching();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    if (!isFetching && selectedEvent) {
      setLastUpdated(Date.now());
    }
  }, [isFetching, selectedEvent]);

  // Get first division ID from event (most events have one division)
  const divisionId = selectedEvent?.divisions?.[0]?.id;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 py-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <LiveIndicator 
            isLive={!isFetching} 
            lastUpdated={lastUpdated}
          />
          <ThemeToggle 
            isDark={isDark} 
            onToggle={() => setIsDark(!isDark)} 
          />
        </div>

        {/* Event selector */}
        <EventSelector 
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
          className="mb-6"
        />

        {/* Main content grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left column - Matches */}
          <div className="lg:col-span-1">
            <MatchList 
              eventId={selectedEvent?.id} 
              divisionId={divisionId}
            />
          </div>

          {/* Right column - Rankings, Skills, Awards */}
          <div className="space-y-6">
            <RankingsTable 
              eventId={selectedEvent?.id} 
              divisionId={divisionId}
            />
            <SkillsCard 
              eventId={selectedEvent?.id}
            />
            <AwardsGrid 
              eventId={selectedEvent?.id}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Data from{' '}
          <a 
            href="https://www.robotevents.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            RobotEvents.com
          </a>
          {' '}• Team 938X - Blaze Xtra hot sauce 🌶️
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;
