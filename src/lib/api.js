// RobotEvents API Client
const API_BASE = 'https://www.robotevents.com/api/v2';
const API_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzIiwianRpIjoiMTZiZDcwYzBmNTc2YjUyNWIzOTI2YzViMDJmMzdiOTNiMGZkZGYxZGI3YWM5MjRhZmFkMWZjOTI1MjM0NWJjM2UxMjRhNDUwNDNmYTJjZjEiLCJpYXQiOjE3Njk4ODQzNzkuMzU2NTUsIm5iZiI6MTc2OTg4NDM3OS4zNTY1NTE5LCJleHAiOjI3MTY1NjkxNzkuMzQ0OTgyMSwic3ViIjoiMTI5MDMxIiwic2NvcGVzIjpbXX0.o2QJMUNqPMKKfEWQwBx8xrFL102xspbUagEWonBU55rdpZjRdHOOXAqC68MSZqN3bW0QYY-tCrH-l039-G5r9KzCisiZ7BiYEanTVFouX78QSQqlBra8xFoxz_rKJdc8EbsFbrRkmoSsMiqu2TeTHx8DwOuB8pViUEXhNVevSffnrNmpXtiJ7RFRd9qx2b6LV8FFkXTGZyTULeCvRkjza0sPn0UEB7geKyFqXP4sclTE5cozjf8V0vAZZsfIIVCdYcFKjNdVqUrywG1CGBc3eUFSc8q7qaWALfMWbgJoulQ_XiJkLtZcp8TPO-thDawqAg7_z_csoXwf_NLd-ubrdft2XaUPcyo8KsCAdqIDZHrgedC7gKMbj41AX5nI1qMEHC1nc4qH76Vaw6NjTIfjOY2DRTXc3c5oef7KPlISiqehDHzPMsSHRaDKfBBAmo5KIA8Dso9fgPLsOjmz283DW4a8NU66IZu33kjQEyqSe5Z9LYZDzKhpMrQLo2Eo-mGt8YU07JEVgGPa_Gv45_3RUtd7a3uKNySzOjlRcGtSoVAFOwKbuBVm-zXAHqVOFNcW-8U2Krk8t4A2aZL5djcIQYu06dsiSrvMECxeVzlvck-fsu8DX0rm7hSLCsLeFOxOqUFCaw5dJaN2h4VYfXymK_D4jZ_CwaIKZpqbvMuUqGs';

// Team 938X configuration
export const TEAM_NUMBER = '938X';
export const TEAM_ID = 123981;

async function fetchAPI(endpoint, params = {}) {
  const url = new URL(`${API_BASE}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => url.searchParams.append(`${key}[]`, v));
    } else if (value !== undefined) {
      url.searchParams.set(key, value);
    }
  });

  const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Fetch all pages of paginated data
async function fetchAllPages(endpoint, params = {}) {
  const allData = [];
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetchAPI(endpoint, { ...params, page, per_page: 100 });
    allData.push(...response.data);
    hasMore = response.meta.current_page < response.meta.last_page;
    page++;
  }

  return allData;
}

// Team APIs
export async function getTeam(teamId = TEAM_ID) {
  const response = await fetchAPI(`/teams/${teamId}`);
  return response;
}

export async function getTeamEvents(teamId = TEAM_ID) {
  return fetchAllPages(`/teams/${teamId}/events`);
}

// Event APIs
export async function getEvent(eventId) {
  const response = await fetchAPI(`/events/${eventId}`);
  return response;
}

export async function getEventTeams(eventId) {
  return fetchAllPages(`/events/${eventId}/teams`);
}

export async function getEventMatches(eventId, divisionId) {
  return fetchAllPages(`/events/${eventId}/divisions/${divisionId}/matches`);
}

export async function getEventRankings(eventId, divisionId) {
  return fetchAllPages(`/events/${eventId}/divisions/${divisionId}/rankings`);
}

export async function getEventSkills(eventId) {
  return fetchAllPages(`/events/${eventId}/skills`);
}

export async function getEventAwards(eventId) {
  return fetchAllPages(`/events/${eventId}/awards`);
}

// Get team's matches from an event
export async function getTeamMatches(eventId, divisionId, teamId = TEAM_ID) {
  const response = await fetchAPI(`/events/${eventId}/divisions/${divisionId}/matches`, {
    team: [teamId],
  });
  return response.data;
}

// Get team's ranking from an event
export async function getTeamRanking(eventId, divisionId, teamId = TEAM_ID) {
  const response = await fetchAPI(`/events/${eventId}/divisions/${divisionId}/rankings`, {
    team: [teamId],
  });
  return response.data[0] || null;
}

// Get team's skills from an event
export async function getTeamSkills(eventId, teamId = TEAM_ID) {
  const response = await fetchAPI(`/events/${eventId}/skills`, {
    team: [teamId],
  });
  return response.data;
}

// Get team's awards from an event
export async function getTeamAwards(eventId, teamId = TEAM_ID) {
  const response = await fetchAPI(`/events/${eventId}/awards`, {
    team: [teamId],
  });
  return response.data;
}
