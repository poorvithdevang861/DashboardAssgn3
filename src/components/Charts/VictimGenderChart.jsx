import { useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const VictimGenderChart = ({ data }) => {
  const chartData = useMemo(() => {
    const genderCounts = {}
    data.forEach(record => {
      const gender = record['Victim Gender'] || 'Unknown'
      genderCounts[gender] = (genderCounts[gender] || 0) + 1
    })

    const total = data.length
    return Object.entries(genderCounts)
      .map(([name, value]) => ({ 
        name, 
        value,
        percentage: total > 0 ? ((value / total) * 100).toFixed(1) : 0
      }))
      .sort((a, b) => b.value - a.value)
  }, [data])

  const total = data.length
  const dominantGender = chartData[0]

  const COLORS = ['#038836ff', '#0c5aebff', '#DC143C', '#FF8C94']

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '8px', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#f4f4f4ff' }}>
          Total: <strong style={{ color: '#a9bde6ff' }}>{total.toLocaleString()}</strong>
        </div>
        {dominantGender && (
          <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#e9e9e9ff' }}>
            Dominant: <strong style={{ color: '#DC143C' }}>{dominantGender.name}</strong> ({dominantGender.percentage}%)
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius="70%"
              fill="#f1f1ffff"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              formatter={(value, name, props) => [
                `${value} crimes (${props.payload.percentage}%)`,
                props.payload.name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VictimGenderChart

