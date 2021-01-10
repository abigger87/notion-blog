import React from 'react'
import MetricCard from './Card'

const WakatimeDailyAverage = ({
  daily_average,
  link,
}: {
  daily_average: string
  link: string
}) => {
  return (
    <MetricCard
      header="Daily Average VSCode Time"
      link={link}
      metric={daily_average}
    />
  )
}

export default WakatimeDailyAverage
