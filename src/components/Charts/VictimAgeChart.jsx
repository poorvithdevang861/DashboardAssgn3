import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const VictimAgeChart = ({ data }) => {
  const chartData = useMemo(() => {
    const ageGroups = {
      '0-18': 0,
      '19-35': 0,
      '36-50': 0,
      '51-65': 0,
      '65+': 0
    }

    data.forEach(record => {
      const age = parseInt(record['Victim Age']) || 0
      if (age >= 0 && age <= 18) ageGroups['0-18']++
      else if (age >= 19 && age <= 35) ageGroups['19-35']++
      else if (age >= 36 && age <= 50) ageGroups['36-50']++
      else if (age >= 51 && age <= 65) ageGroups['51-65']++
      else if (age > 65) ageGroups['65+']++
    })

    const total = data.length
    return Object.entries(ageGroups).map(([ageGroup, count]) => ({
      ageGroup,
      count,
      percentage: total > 0 ? ((count / total) * 100).toFixed(1) : 0
    }))
  }, [data])

  const total = data.length
  const topAgeGroup = chartData.sort((a, b) => b.count - a.count)[0]

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px' }}>
        <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#e8edf7ff' }}>
          Total Victims: <strong style={{ color: '#9abafaff' }}>{total.toLocaleString()}</strong>
        </div>
        {topAgeGroup && (
          <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#e0e5eeff' }}>
            Most Affected: <strong style={{ color: '#DC143C' }}>{topAgeGroup.ageGroup}</strong> ({topAgeGroup.percentage}%)
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 20, left: 5, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="ageGroup" stroke="#f7f9fcff" fontSize={11} className="text-xs" />
            <YAxis stroke="#dce0e9ff" fontSize={11} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value, name, props) => [
                `${value} victims (${props.payload.percentage}%)`,
                props.payload.ageGroup
              ]}
              cursor={{ fill: 'rgba(255, 140, 148, 0.1)' }}
            />
            <Bar dataKey="count" fill="#c5201bff" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default VictimAgeChart

