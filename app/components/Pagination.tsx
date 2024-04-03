/* Pagination component */

'use client'

import { ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon } from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
    itemCount: number;
    pageSize: number;
    currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {

    const router = useRouter()
    const searchParams = useSearchParams()

    // Get the page count
    const pageCount = Math.ceil(itemCount / pageSize);

    // Pagination not render, when pageCount less or equal 1 page
    if (pageCount <= 1) {
        return null
    }

    // Set te url -> example: http://localhost:3000/?page=5
    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push('?' + params.toString())
    }

    return (
        <Flex align='center' gap='2'>
            {/* Add text field - current page and pages count */}
            <Text size='2'>Page {currentPage} of {pageCount}</Text>
            {/* Add Double and Simple arrow icon - set the buttons disabled value */}
            <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(1)}>
                <DoubleArrowLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                <ChevronLeftIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)}>
                <ChevronRightIcon />
            </Button>
            <Button color='gray' variant='soft' disabled={currentPage === pageCount} onClick={() => changePage(pageCount)}>
                <DoubleArrowRightIcon />
            </Button>
        </Flex>
    )
}

export default Pagination