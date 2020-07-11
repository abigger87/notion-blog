import { Skeleton, Box } from '@chakra-ui/core'

const SkeletonBlock = ({ key }) => {
  return (
    <Box w="100%" key={key ? key : 'skeleton-block'} m={2}>
      <Skeleton height="20px" width="40%" my="10px" />
      <Skeleton height="20px" width="90%" my="10px" />
      <Skeleton height="20px" width="100%" my="10px" />
      <Skeleton height="20px" width="70%" my="10px" />
      <Skeleton height="20px" width="95%" my="10px" />
      <Skeleton height="20px" width="65%" my="10px" />
      <Skeleton height="20px" width="84%" my="10px" />
      <Skeleton height="20px" width="100%" my="10px" />
      <Skeleton height="20px" width="96%" my="10px" />
      <Skeleton height="20px" width="65%" my="10px" />
    </Box>
  )
}

export default SkeletonBlock
