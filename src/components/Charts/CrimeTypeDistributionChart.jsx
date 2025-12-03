import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const CrimeTypeDistributionChart = ({ data }) => {
  const chartData = useMemo(() => {
    const crimeTypeGenderCounts = {}
    
    data.forEach(record => {
      const type = record['Crime Description']
      const gender = record['Victim Gender'] || 'Unknown'
      
      if (!crimeTypeGenderCounts[type]) {
        crimeTypeGenderCounts[type] = { M: 0, F: 0, X: 0, Unknown: 0 }
      }
      crimeTypeGenderCounts[type][gender] = (crimeTypeGenderCounts[type][gender] || 0) + 1
    })

    const total = data.length
    // Get top crime types by total count
    const crimeTypeTotals = Object.entries(crimeTypeGenderCounts).map(([type, counts]) => ({
      type,
      total: Object.values(counts).reduce((sum, val) => sum + val, 0),
      ...counts
    })).sort((a, b) => b.total - a.total).slice(0, 8)

    return crimeTypeTotals.map(({ type, total: typeTotal, ...genders }) => ({
      type: type.length > 12 ? type.substring(0, 12) + '...' : type,
      fullType: type,
      total: typeTotal,
      percentage: total > 0 ? ((typeTotal / total) * 100).toFixed(1) : 0,
      Male: genders.M || 0,
      Female: genders.F || 0,
      Other: (genders.X || 0) + (genders.Unknown || 0)
    }))
  }, [data])

  const totalCrimes = data.length
  const topCrime = chartData[0]

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px', padding: '0 4px' }}>
        <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#fefefeff' }}>
          Total Types: <strong style={{ color: '#b9d0fdff' }}>{chartData.length}</strong>
        </div>
        {topCrime && (
          <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#f6f8fbff' }}>
            Top: <strong style={{ color: '#ef3258ff' }}>{topCrime.total}</strong> ({topCrime.percentage}%)
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 5, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="type" 
              angle={-45} 
              textAnchor="end" 
              height={70}
              stroke="#e9e9e9ff" 
              fontSize={9}
              className="text-xs"
            />
            <YAxis stroke="#d5ddefff" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '14px' }}
              formatter={(value, name) => [`${value} crimes`, name]}
              cursor={{ fill: 'rgba(10, 26, 58, 0.1)' }}
            />
            <Legend />
            <Bar dataKey="Male" fill="#008cffff" radius={[8, 8, 1, 1]} />
            <Bar dataKey="Female" fill="#44922aff" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Other" fill="#DC143C" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CrimeTypeDistributionChart

