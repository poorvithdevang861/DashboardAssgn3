# Crime Intelligence Overview Dashboard

A modern, desktop-optimized dashboard for visualizing Indian crime data with interactive filters and comprehensive analytics.

## Features

- **Interactive Filters**: Filter by City, Crime Type, Month, Weapon, Gender, and Age Group
- **KPI Tiles**: Total Crimes, Most Common Crime Type, Highest Crime City, Case Closure Rate
- **6 Visualizations**:
  - Crime Hotspots by City (Horizontal Bar Chart)
  - Crime Type Distribution (Vertical Bar Chart)
  - Victim Gender (Donut Chart)
  - City vs Crime Type Heatmap
  - Victim Age Distribution (Bar Chart)
  - Monthly Crime Trend (Line Chart)

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- JSON dataset (converted from CSV for faster loading)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

## Project Structure

```
DashboardAssgn3/
├── data/
│   └── crime-data.json          # Converted JSON dataset
├── src/
│   ├── components/
│   │   ├── Charts/              # Chart components
│   │   ├── FilterSidebar.jsx   # Filter sidebar component
│   │   └── KPITiles.jsx         # KPI tiles component
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── package.json
└── vite.config.js
```

## Design Specifications

- **Colors**: 
  - Primary: #1F4E79
  - Accent: #4A90E2
  - Highlight: #F5A623
- **Cards**: White (#FFFFFF), 16px radius, soft shadow
- **Font**: Inter (with system fallbacks)
- **Layout**: Desktop-optimized, non-scrollable design

## Data Format

The dashboard uses a JSON dataset converted from the original CSV file. The JSON format provides faster loading and parsing compared to CSV, making it ideal for web applications.

