import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CrimeHotspotsChart = ({ data }) => {
  const chartData = useMemo(() => {
    const cityCounts = {}
    data.forEach(record => {
      const city = record.City
      cityCounts[city] = (cityCounts[city] || 0) + 1
    })

    const total = data.length
    return Object.entries(cityCounts)
      .map(([city, count]) => ({ 
        city, 
        count,
        percentage: total > 0 ? ((count / total) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }, [data])

  const totalCrimes = data.length
  const topCity = chartData[0]

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
        <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#6b7280' }}>
          Total: <strong style={{ color: '#0A1A3A' }}>{totalCrimes.toLocaleString()}</strong>
        </div>
        {topCity && (
          <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#6b7280' }}>
            Top: <strong style={{ color: '#DC143C' }}>{topCity.city}</strong> ({topCity.percentage}%)
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis type="number" stroke="#6b7280" fontSize={11} />
            <YAxis 
              dataKey="city" 
              type="category" 
              stroke="#6b7280" 
              fontSize={10}
              width={70}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value, name, props) => [
                `${value} crimes (${props.payload.percentage}%)`,
                props.payload.city
              ]}
              cursor={{ fill: 'rgba(42, 59, 90, 0.1)' }}
            />
            <Bar dataKey="count" fill="#2A3B5A" radius={[0, 8, 8, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default CrimeHotspotsChart

