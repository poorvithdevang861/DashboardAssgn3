import { useMemo } from 'react'

const KPITiles = ({ data, allData }) => {
  const kpis = useMemo(() => {
    const totalCrimes = data.length
    
    // Calculate previous period for comparison (comparing filtered vs all data)
    const allDataTotal = allData?.length || data.length
    const previousPeriod = allDataTotal - totalCrimes
    const totalChange = previousPeriod > 0 ? (((totalCrimes - previousPeriod) / previousPeriod) * 100).toFixed(1) : '0.0'
    const isTotalIncreasing = parseFloat(totalChange) > 0
    
    // Most common crime type
    const crimeTypeCounts = {}
    data.forEach(record => {
      const type = record['Crime Description']
      crimeTypeCounts[type] = (crimeTypeCounts[type] || 0) + 1
    })
    const mostCommonCrime = Object.entries(crimeTypeCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
    const mostCommonCrimeCount = crimeTypeCounts[mostCommonCrime] || 0
    const mostCommonCrimePercent = totalCrimes > 0 ? ((mostCommonCrimeCount / totalCrimes) * 100).toFixed(1) : 0

    // Highest crime city
    const cityCounts = {}
    data.forEach(record => {
      const city = record.City
      cityCounts[city] = (cityCounts[city] || 0) + 1
    })
    const highestCrimeCity = Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'
    const highestCrimeCityCount = cityCounts[highestCrimeCity] || 0
    const highestCrimeCityPercent = totalCrimes > 0 ? ((highestCrimeCityCount / totalCrimes) * 100).toFixed(1) : 0

    // Case closure rate
    const closedCases = data.filter(record => record['Case Closed'] === 'Yes').length
    const closureRate = totalCrimes > 0 ? ((closedCases / totalCrimes) * 100).toFixed(1) : 0
    
    // Calculate closure rate change
    const allClosedCases = allData?.filter(record => record['Case Closed'] === 'Yes').length || closedCases
    const allClosureRate = allData?.length > 0 ? ((allClosedCases / allData.length) * 100) : parseFloat(closureRate)
    const closureChange = (parseFloat(closureRate) - allClosureRate).toFixed(1)
    const isClosureIncreasing = parseFloat(closureChange) > 0

    return {
      totalCrimes,
      totalChange: Math.abs(totalChange),
      isTotalIncreasing,
      mostCommonCrime,
      mostCommonCrimePercent,
      highestCrimeCity,
      highestCrimeCityPercent,
      closureRate: `${closureRate}%`,
      closureChange: Math.abs(closureChange),
      isClosureIncreasing
    }
  }, [data, allData])

  const TrendIcon = ({ isIncreasing }) => (
    <svg 
      width="16" 
      height="14" 
      viewBox="0 0 16 16" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', marginLeft: '4px' }}
    >
      {isIncreasing ? (
        <path d="M8 3L12 7H9V13H7V7H4L8 3Z" fill="#10B981" />
      ) : (
        <path d="M8 13L4 9H7V3H9V9H12L8 13Z" fill="#EF4444" />
      )}
    </svg>
  )

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="kpi-label">Total Crimes</div>
        <div className="kpi-value-container">
          <div className="kpi-value kpi-value-large">{kpis.totalCrimes.toLocaleString()}</div>
          <div className={`kpi-trend ${kpis.isTotalIncreasing ? 'trend-up' : 'trend-down'}`}>
            <TrendIcon isIncreasing={kpis.isTotalIncreasing} />
            <span>{kpis.totalChange}%</span>
            <span className="kpi-trend-label">vs all data</span>
          </div>
        </div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Most Common Crime Type</div>
        <div className="kpi-value kpi-value-medium text-accent truncate" title={kpis.mostCommonCrime}>
          {kpis.mostCommonCrime}
        </div>
        <div className="kpi-subtext">{kpis.mostCommonCrimePercent}% of total crimes</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Highest Crime City</div>
        <div className="kpi-value kpi-value-medium text-highlight">{kpis.highestCrimeCity}</div>
        <div className="kpi-subtext">{kpis.highestCrimeCityPercent}% of total crimes</div>
      </div>
      <div className="kpi-card">
        <div className="kpi-label">Case Closure Rate</div>
        <div className="kpi-value-container">
          <div className="kpi-value kpi-value-large">{kpis.closureRate}</div>
          <div className={`kpi-trend ${kpis.isClosureIncreasing ? 'trend-up' : 'trend-down'}`}>
            <TrendIcon isIncreasing={kpis.isClosureIncreasing} />
            <span>{kpis.closureChange}%</span>
            <span className="kpi-trend-label">vs average</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KPITiles

