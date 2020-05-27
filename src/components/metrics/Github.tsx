import React from 'react'
import useSWR from 'swr'
import format from 'comma-number'

import fetcher from '../../lib/fetcher'

import MetricCard from './Card'

const GitHub = ({ link }: { link: string }) => {
  const { data } = useSWR(`/api/github?link=${link}`, fetcher)

  const stars = format(data?.stars)

  return <MetricCard header="GitHub Stars" link={link} metric={stars} />
}

export default GitHub
