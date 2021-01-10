import React from 'react'
import useSWR from 'swr'
import fetcher from '../../lib/fetcher'

import {
  WakatimeTotalTime,
  WakatimeProject,
  WakatimeDailyAverage,
  WakatimeNumberProjects,
} from '.'
import { SimpleGrid } from '@chakra-ui/core'

const Wakatime = ({
  link,
  range,
  children,
}: {
  link: string
  range: string
  children: any
}) => {
  const { data } = useSWR(
    `/api/wakatime/year_stats?link=${link}&range=${range}`,
    fetcher
  )

  return (
    <>
      <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
        <WakatimeDailyAverage
          link={link}
          daily_average={
            data?.wakatime_stats?.data?.human_readable_daily_average
          }
        />
        <WakatimeTotalTime
          link={link}
          range={range}
          daily_average={data?.wakatime_stats?.data?.human_readable_total}
        />
      </SimpleGrid>
      <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
        <WakatimeProject
          language_name={data?.wakatime_stats?.data?.languages?.[0]?.name}
          num_hours={data?.wakatime_stats?.data?.languages?.[0]?.text}
          link={link}
        />
        <WakatimeProject
          language_name={data?.wakatime_stats?.data?.languages?.[1]?.name}
          num_hours={data?.wakatime_stats?.data?.languages?.[1]?.text}
          link={link}
        />
      </SimpleGrid>
      <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
        <WakatimeProject
          language_name={data?.wakatime_stats?.data?.languages?.[2]?.name}
          num_hours={data?.wakatime_stats?.data?.languages?.[2]?.text}
          link={link}
        />
        <WakatimeProject
          language_name={data?.wakatime_stats?.data?.languages?.[3]?.name}
          num_hours={data?.wakatime_stats?.data?.languages?.[3]?.text}
          link={link}
        />
      </SimpleGrid>
      <SimpleGrid columns={[1, 1, 2]} spacing={4} mb={4}>
        <WakatimeNumberProjects
          link={link}
          num_projects={data?.wakatime_stats?.data?.projects?.length}
        />
        {children}
      </SimpleGrid>
    </>
  )
}

export default Wakatime
