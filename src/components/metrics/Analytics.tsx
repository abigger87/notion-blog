import React from 'react'
import useSWR from 'swr'
import format from 'comma-number'

import fetcher from '../../lib/fetcher'

import MetricCard from './Card'

const Analytics = ({ link }: { link: string }) => {
  const { data } = useSWR('/api/page-views', fetcher)

  const pageViews = format(data?.total)

  return <MetricCard header="All-Time Views" link={link} metric={pageViews} />
}

export default Analytics
