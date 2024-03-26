/* Add loading skeleton with new issue page */
import { Box } from '@radix-ui/themes'
import { Skeleton } from '@/app/components' // Inport components library on idex.tx file. Organization

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton height="20rem"/>
    </Box>
  )
}

export default LoadingNewIssuePage