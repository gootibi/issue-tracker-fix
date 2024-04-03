/* Pagination component */
import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    // Get the page count
    const pageCount = Math.ceil(itemCount / pageSize);

    // Pagination not render, when pageCount less or equal 1 page
    if (pageCount <= 1) {
        return null
    }

    return (
        <Flex align='center' gap='2'>
            {/* Add text field - current page and pages count */}
            <Text size='2'>Page {currentPage} of {pageCount}</Text>
            {/* Add Double and Simple arrow icon - set the buttons disabled value */}
            <Button color='gray' variant='soft' disabled={currentPage === 1}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === 1}>
                <ChevronLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination