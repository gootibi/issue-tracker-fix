/* Add loading skeleton with new issue page */
import { Box } from '@radix-ui/themes'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const LoadingNewIssuePage = () => {
  return (
    <Box className='max-w-xl'>
      <Skeleton />
      <Skeleton height="20rem"/>
    </Box>
  )
}

export default LoadingNewIssuePage