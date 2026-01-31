import { useQuery } from '@tanstack/react-query';
import * as api from '../lib/api';

// Hook to fetch team info
export function useTeam() {
  return useQuery({
    queryKey: ['team', api.TEAM_ID],
    queryFn: () => api.getTeam(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// Hook to fetch team's events
export function useTeamEvents() {
  return useQuery({
    queryKey: ['teamEvents', api.TEAM_ID],
    queryFn: () => api.getTeamEvents(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to fetch event details
export function useEvent(eventId) {
  return useQuery({
    queryKey: ['event', eventId],
    queryFn: () => api.getEvent(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch team's matches from an event
export function useTeamMatches(eventId, divisionId) {
  return useQuery({
    queryKey: ['teamMatches', eventId, divisionId, api.TEAM_ID],
    queryFn: () => api.getTeamMatches(eventId, divisionId),
    enabled: !!eventId && !!divisionId,
    refetchInterval: 30000, // Refetch every 30 seconds for live updates
  });
}

// Hook to fetch all matches from an event division
export function useEventMatches(eventId, divisionId) {
  return useQuery({
    queryKey: ['eventMatches', eventId, divisionId],
    queryFn: () => api.getEventMatches(eventId, divisionId),
    enabled: !!eventId && !!divisionId,
    refetchInterval: 30000,
  });
}

// Hook to fetch rankings from an event
export function useEventRankings(eventId, divisionId) {
  return useQuery({
    queryKey: ['eventRankings', eventId, divisionId],
    queryFn: () => api.getEventRankings(eventId, divisionId),
    enabled: !!eventId && !!divisionId,
    refetchInterval: 30000,
  });
}

// Hook to fetch team's ranking
export function useTeamRanking(eventId, divisionId) {
  return useQuery({
    queryKey: ['teamRanking', eventId, divisionId, api.TEAM_ID],
    queryFn: () => api.getTeamRanking(eventId, divisionId),
    enabled: !!eventId && !!divisionId,
    refetchInterval: 30000,
  });
}

// Hook to fetch skills from an event
export function useEventSkills(eventId) {
  return useQuery({
    queryKey: ['eventSkills', eventId],
    queryFn: () => api.getEventSkills(eventId),
    enabled: !!eventId,
    refetchInterval: 30000,
  });
}

// Hook to fetch team's skills
export function useTeamSkills(eventId) {
  return useQuery({
    queryKey: ['teamSkills', eventId, api.TEAM_ID],
    queryFn: () => api.getTeamSkills(eventId),
    enabled: !!eventId,
    refetchInterval: 30000,
  });
}

// Hook to fetch awards from an event
export function useEventAwards(eventId) {
  return useQuery({
    queryKey: ['eventAwards', eventId],
    queryFn: () => api.getEventAwards(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to fetch team's awards
export function useTeamAwards(eventId) {
  return useQuery({
    queryKey: ['teamAwards', eventId, api.TEAM_ID],
    queryFn: () => api.getTeamAwards(eventId),
    enabled: !!eventId,
    staleTime: 1000 * 60 * 5,
  });
}
