import React from 'react'
import MetricCard from './Card'

const WakatimeTotalTime = ({
  link,
  range,
  daily_average,
}: {
  link: string
  range: string
  daily_average: string
}) => {
  let vscode_time = range === 'last_30_days' ? 'Last 30 Days' : 'Last 7 Days'
  if (range === 'last_6_months') {
    vscode_time = 'Last 6 Months'
  } else if (range === 'last_year') {
    vscode_time = 'Last Year'
  }

  return (
    <MetricCard
      header={`Total VSCode Time ${vscode_time}`}
      link={link}
      metric={daily_average}
    />
  )
}

export default WakatimeTotalTime
