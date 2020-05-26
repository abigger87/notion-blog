import React from 'react'
import useSWR from 'swr'
import format from 'comma-number'

import fetcher from '../../lib/fetcher'

import MetricCard from './Card'

const Gumroad = ({ link }: { link: string }) => {
  const { data } = useSWR('/api/gumroad', fetcher)

  const sales = format(data?.sales)

  return (
    <MetricCard
      header="Gumroad Sales"
      link={link}
      metric={sales && `$${sales}`}
    />
  )
}

export default Gumroad
