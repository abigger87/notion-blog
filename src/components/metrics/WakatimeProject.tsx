import React from 'react'
import MetricCard from './Card'

const WakatimeProject = ({
  num_hours,
  language_name,
  link,
}: {
  num_hours: string
  language_name
  link: string
}) => {
  return (
    <MetricCard
      header={`Annual Time Writing ${language_name}`}
      link={link}
      metric={num_hours}
    />
  )
}

export default WakatimeProject
