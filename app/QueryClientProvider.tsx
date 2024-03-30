/* Cache for storing data we get from the backend - In layout add QueryClientProvider - TanStack Query */
'use client'

import { QueryClient, QueryClientProvider as ReactQueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

/* This query client contains a cache for storing data we get from the backend */
const queryClient = new QueryClient()

const QueryClientProvider = ({ children }: PropsWithChildren) => {
    return (
        <ReactQueryClientProvider client={queryClient}>
            {children}
        </ReactQueryClientProvider>
    )
}

export default QueryClientProvider