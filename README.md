# VEX Team 938X Results Website 🌶️

A modern, live-updating website to track VEX V5 competition results for Team 938X - "Blaze Xtra hot sauce".

![Team 938X](https://img.shields.io/badge/Team-938X-blue)
![VEX V5RC](https://img.shields.io/badge/Program-VEX%20V5RC-red)
![Middle School](https://img.shields.io/badge/Grade-Middle%20School-green)

## Features

- 🏆 **Live Match Results** - Real-time scores from ongoing tournaments
- 📊 **Division Rankings** - See where you stand against the competition
- 🎮 **Skills Scores** - Track driver and programming skills performance
- 🥇 **Awards Showcase** - Display earned awards at each event
- 🌙 **Dark/Light Mode** - Easy on the eyes, day or night
- 📱 **Mobile Responsive** - Works great on phones and tablets
- 🔄 **Auto-Refresh** - Data updates every 30 seconds during events

## Tech Stack

- **React 18** with Vite
- **Tailwind CSS** for styling
- **TanStack Query** for data fetching & caching
- **Lucide React** for icons
- **RobotEvents API v2** for competition data

## Getting Started

### Prerequisites

- Node.js 18+
- A RobotEvents API token (get one at [robotevents.com](https://www.robotevents.com/api/v2))

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/vex-team-results.git
cd vex-team-results

# Install dependencies
npm install

# Start development server
npm run dev
```

### Configuration

The API token is configured in `src/lib/api.js`. To use your own team:

1. Update `TEAM_NUMBER` and `TEAM_ID` in `src/lib/api.js`
2. Update the footer text in `src/App.jsx`

### Deployment

Deploy to GitHub Pages:

```bash
npm run deploy
```

Or build for any static hosting:

```bash
npm run build
# Output is in the `dist` folder
```

## Data Sources

All competition data is fetched from the official [RobotEvents API](https://www.robotevents.com/api/v2). Data refreshes automatically every 30 seconds when viewing an active event.

## License

MIT

---

Built with ❤️ for Team 938X - Blaze Robotics Academy, Bellevue, WA
