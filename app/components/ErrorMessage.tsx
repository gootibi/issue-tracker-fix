import { Callout, Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null

    return (
        <>
            <Text as='p' color='red'>{children}</Text>

            <Callout.Root color='red' className='mb-5'>
                <Callout.Text>
                    {children}
                </Callout.Text>
            </Callout.Root>
        </>
    )
}

export default ErrorMessage