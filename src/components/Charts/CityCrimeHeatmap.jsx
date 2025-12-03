import { useMemo } from 'react'

const CityCrimeHeatmap = ({ data }) => {
  const heatmapData = useMemo(() => {
    const cityCrimeMap = {}
    
    data.forEach(record => {
      const city = record.City
      const crimeType = record['Crime Description']
      const key = `${city}-${crimeType}`
      cityCrimeMap[key] = (cityCrimeMap[key] || 0) + 1
    })

    // Get top cities and crime types
    const cityCounts = {}
    const crimeTypeCounts = {}
    
    data.forEach(record => {
      cityCounts[record.City] = (cityCounts[record.City] || 0) + 1
      crimeTypeCounts[record['Crime Description']] = (crimeTypeCounts[record['Crime Description']] || 0) + 1
    })

    const topCities = Object.entries(cityCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([city]) => city)

    const topCrimeTypes = Object.entries(crimeTypeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([type]) => type)

    // Create matrix
    const matrix = topCities.map(city => {
      const row = { city }
      topCrimeTypes.forEach(crimeType => {
        const key = `${city}-${crimeType}`
        row[crimeType] = cityCrimeMap[key] || 0
      })
      return row
    })

    return { matrix, cities: topCities, crimeTypes: topCrimeTypes, maxValue: Math.max(...Object.values(cityCrimeMap), 1) }
  }, [data])

  const getIntensity = (value, maxValue) => {
    if (value === 0) return 'bg-gray-50'
    const intensity = value / maxValue
    if (intensity > 0.7) return 'bg-primary'
    if (intensity > 0.4) return 'bg-accent'
    if (intensity > 0.2) return 'bg-secondary'
    return 'bg-highlight'
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      maxWidth: '100%', 
      overflow: 'auto', 
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <table style={{ 
        width: '100%', 
        fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      }}>
        <thead>
          <tr>
            <th style={{ 
              textAlign: 'left', 
              padding: 'clamp(4px, 0.6vw, 8px)', 
              fontWeight: 600, 
              color: '#eff2f6ff', 
              position: 'sticky', 
              left: 0,  
              zIndex: 10,
              width: '20%',
              borderRight: '2px solidrgb(111, 150, 208)'
            }}>
              City
            </th>
            {heatmapData.crimeTypes.map(type => (
              <th 
                key={type} 
                style={{ 
                  padding: 'clamp(4px, 0.6vw, 8px)', 
                  fontWeight: 600, 
                  color: '#f6f6f6ff', 
                  textAlign: 'center',
                  fontSize: 'clamp(0.65rem, 0.85vw, 0.75rem)',
                  wordWrap: 'break-word',
                  borderBottom: '2px solidrgb(85, 137, 214)'
                }}
                title={type}
              >
                {type.length > 8 ? type.substring(0, 8) + '...' : type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {heatmapData.matrix.map((row, idx) => (
            <tr key={row.city}>
              <td style={{ 
                padding: 'clamp(4px, 0.6vw, 8px)', 
                fontWeight: 500, 
                color: '#c1cbdbff', 
                position: 'sticky', 
                left: 0,               
                zIndex: 10, 
                borderRight: '2px solidrgb(41, 94, 174)',
                fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)'
              }}>
                {row.city}
              </td>
              {heatmapData.crimeTypes.map(crimeType => (
                <td
                  key={crimeType}
                  className={`text-center ${getIntensity(row[crimeType], heatmapData.maxValue)} font-medium text-white`}
                  style={{ 
                    padding: 'clamp(4px, 0.6vw, 8px)',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                    minWidth: '40px'
                  }}
                  title={`${row.city} - ${crimeType}: ${row[crimeType]}`}
                >
                  {row[crimeType] > 0 ? row[crimeType] : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CityCrimeHeatmap

