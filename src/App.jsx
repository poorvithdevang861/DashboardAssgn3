import { useState, useMemo } from 'react'
import FilterSidebar from './components/FilterSidebar'
import KPITiles from './components/KPITiles'
import CrimeHotspotsChart from './components/Charts/CrimeHotspotsChart'
import CrimeTypeDistributionChart from './components/Charts/CrimeTypeDistributionChart'
import VictimGenderChart from './components/Charts/VictimGenderChart'
import CityCrimeHeatmap from './components/Charts/CityCrimeHeatmap'
import VictimAgeChart from './components/Charts/VictimAgeChart'
import MonthlyTrendChart from './components/Charts/MonthlyTrendChart'
import crimeData from '../data/crime-data.json'

const initialFilters = {
  city: 'All',
  crimeType: 'All',
  year: 'All',
  weapon: 'All',
  gender: 'All',
  ageGroup: 'All',
}

function App() {
  const [filters, setFilters] = useState(initialFilters)

  // Get unique values for filters
  const filterOptions = useMemo(() => {
    const cities = [...new Set(crimeData.map(d => d.City))].sort()
    const crimeTypes = [...new Set(crimeData.map(d => d['Crime Description']))].sort()
    const weapons = [...new Set(crimeData.map(d => d['Weapon Used']))].sort()
    const genders = [...new Set(crimeData.map(d => d['Victim Gender']))].sort()
    
    // Extract years
    const yearSet = new Set()
    crimeData.forEach(d => {
      const date = new Date(d['Date of Occurrence'])
      if (!isNaN(date.getTime())) {
        yearSet.add(date.getFullYear())
      }
    })
    const years = Array.from(yearSet).map(y => parseInt(y)).sort((a, b) => a - b)

    return { cities, crimeTypes, weapons, genders, years }
  }, [])

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return crimeData.filter(record => {
      if (filters.city !== 'All' && record.City !== filters.city) return false
      if (filters.crimeType !== 'All' && record['Crime Description'] !== filters.crimeType) return false
      if (filters.weapon !== 'All' && record['Weapon Used'] !== filters.weapon) return false
      if (filters.gender !== 'All' && record['Victim Gender'] !== filters.gender) return false
      
      if (filters.year !== 'All') {
        const recordYear = new Date(record['Date of Occurrence']).getFullYear()
        if (recordYear !== parseInt(filters.year)) return false
      }

      if (filters.ageGroup !== 'All') {
        const age = parseInt(record['Victim Age'])
        if (filters.ageGroup === '0-18' && (age < 0 || age > 18)) return false
        if (filters.ageGroup === '19-35' && (age < 19 || age > 35)) return false
        if (filters.ageGroup === '36-50' && (age < 36 || age > 50)) return false
        if (filters.ageGroup === '51-65' && (age < 51 || age > 65)) return false
        if (filters.ageGroup === '65+' && age < 65) return false
      }

      return true
    })
  }, [filters])

  return (
    <div className="dashboard-container">
      {/* Filter Sidebar */}
      <FilterSidebar 
        filters={filters} 
        setFilters={setFilters}
        filterOptions={filterOptions}
        onReset={() => setFilters(initialFilters)}
      />

      {/* Main Dashboard Content */}
      <div className="dashboard-main">
        {/* Header */}
        <h1 className="dashboard-header">Crime Intelligence Overview</h1>
        <p className="dashboard-subtitle">Get Real time update on Indian Crimes</p>

        {/* KPI Tiles */}
        <KPITiles data={filteredData} allData={crimeData} />

        {/* Charts Container - Fluid Grid */}
        <div className="charts-grid">
          {/* Charts Row 1 */}
          <div className="chart-card">
            <h3 className="chart-title">Crime Hotspots by City</h3>
            <div className="chart-wrapper">
              <CrimeHotspotsChart data={filteredData} />
            </div>
          </div>
          <div className="chart-card">
            <h3 className="chart-title">Crime Type Distribution</h3>
            <div className="chart-wrapper">
              <CrimeTypeDistributionChart data={filteredData} />
            </div>
          </div>
          <div className="chart-card">
            <h3 className="chart-title">Victim Gender</h3>
            <div className="chart-wrapper">
              <VictimGenderChart data={filteredData} />
            </div>
          </div>

          {/* Charts Row 2 */}
          <div className="chart-card">
            <h3 className="chart-title">City vs Crime Type Heatmap</h3>
            <div className="chart-wrapper">
              <CityCrimeHeatmap data={filteredData} />
            </div>
          </div>
          <div className="chart-card">
            <h3 className="chart-title">Victim Age Distribution</h3>
            <div className="chart-wrapper">
              <VictimAgeChart data={filteredData} />
            </div>
          </div>
          <div className="chart-card">
            <h3 className="chart-title">Monthly Crime Trend</h3>
            <div className="chart-wrapper">
              <MonthlyTrendChart data={filteredData} selectedYear={filters.year} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

