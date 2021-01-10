import React from 'react'
import MetricCard from './Card'

const WakatimeNumberProjects = ({
  link,
  num_projects,
}: {
  link: string
  num_projects: string
}) => {
  return (
    <MetricCard
      header="Number Projects Last Year"
      link={link}
      metric={num_projects}
    />
  )
}

export default WakatimeNumberProjects
