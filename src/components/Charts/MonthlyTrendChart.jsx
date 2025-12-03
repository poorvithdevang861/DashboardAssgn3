import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const MonthlyTrendChart = ({ data, selectedYear }) => {
  const isAllYears = selectedYear === 'All'

  const chartData = useMemo(() => {
    if (!data || data.length === 0) return []

    if (isAllYears) {
      const yearlyCounts = {}
      data.forEach(record => {
        const date = new Date(record['Date of Occurrence'])
        if (!isNaN(date.getTime())) {
          const year = date.getFullYear()
          yearlyCounts[year] = (yearlyCounts[year] || 0) + 1
        }
      })

      return Object.entries(yearlyCounts)
        .map(([year, count]) => ({
          label: year.toString(),
          year: parseInt(year),
          count,
        }))
        .sort((a, b) => a.year - b.year)
    }

    // Specific year view (months Jan-Dec)
    const monthlyTemplate = monthLabels.map((label, index) => ({
      label,
      monthIndex: index,
      count: 0,
    }))

    data.forEach(record => {
      const date = new Date(record['Date of Occurrence'])
      if (!isNaN(date.getTime())) {
        const monthIdx = date.getMonth()
        if (monthlyTemplate[monthIdx]) {
          monthlyTemplate[monthIdx].count += 1
        }
      }
    })

    return monthlyTemplate
  }, [data, isAllYears])

  const totalCrimes = data.length
  const avgValue = chartData.length > 0 ? (totalCrimes / chartData.length).toFixed(0) : 0
  const avgLabel = isAllYears ? 'Avg/Year' : 'Avg/Month'
  const peakPoint =
    chartData.length > 0
      ? chartData.reduce((max, item) => (item.count > max.count ? item : max), chartData[0])
      : null
  const peakLabel = isAllYears ? 'Peak Year' : 'Peak Month'

  const xAxisProps = isAllYears
    ? { angle: 0, height: 30, textAnchor: 'middle', fontSize: 11 }
    : { angle: -45, height: 60, textAnchor: 'end', fontSize: 10 }

  return (
    <div style={{ width: '100%', height: '100%', maxWidth: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', padding: '0 4px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#f7f7f7ff' }}>
          {avgLabel}: <strong style={{ color: '#a4c1faff' }}>{avgValue}</strong>
        </div>
        {peakPoint && (
          <div style={{ fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)', color: '#fbfcffff' }}>
            {peakLabel}: <strong style={{ color: '#DC143C' }}>{peakPoint.label}</strong> ({peakPoint.count} crimes)
          </div>
        )}
      </div>
      <div style={{ flex: 1, minHeight: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 5, right: 20, left: 5, bottom: isAllYears ? 30 : 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="label"
              stroke="#fafcffff"
              className="text-xs"
              {...xAxisProps}
            />
            <YAxis stroke="#fdfeffff" fontSize={11} />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }}
              formatter={(value, name, props) => [`${value} crimes`, isAllYears ? props.payload.label : `${props.payload.label}`]}
              cursor={{ stroke: '#DC143C', strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="count"
              stroke="#DC143C"
              strokeWidth={2}
              dot={{ fill: '#FF8C94', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MonthlyTrendChart

