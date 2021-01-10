import React from 'react'
import useSWR from 'swr'
import format from 'comma-number'
import { SimpleGrid } from '@chakra-ui/core'

import fetcher from '../../lib/fetcher'

import MetricCard from './Card'

const YouTube = ({ link }: { link: string }) => {
  const { data: swrData } = useSWR(`/api/youtube?link=${link}`, fetcher)

  const subscriberCount = format(swrData?.subscriberCount)
  const viewCount = format(swrData?.viewCount)

  return (
    <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
      <MetricCard
        header="YouTube Subscribers"
        link={link}
        metric={subscriberCount}
      />
      <MetricCard header="YouTube Views" link={link} metric={viewCount} />
    </SimpleGrid>
  )
}

export default YouTube
