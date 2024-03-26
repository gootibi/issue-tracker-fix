/* Give it single issue page loading skeleton */
import { Box, Card, Flex } from '@radix-ui/themes'
import { Skeleton } from '@/app/components' // Inport components library on idex.tx file. Organization

const LoadingIssueDetailPage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton width="8rem" />
      <Flex className='gap-3' my="2">
        <Skeleton width="5rem" />
        <Skeleton width="7rem" />
      </Flex>
      <Card className='prose' my="4">
        <Skeleton count={3} />
      </Card>
    </Box>
  )
}

export default LoadingIssueDetailPage