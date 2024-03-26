import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) },
    })

    if (!issue) {
        notFound() // Never use "return" before the function. not found function, 404 This page could not be found. Auto generated page, when the id is not found
    }

    return (
        <div>
            <p>{issue.title}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
            <p>{issue.description}</p>
        </div>
    )
}

export default IssueDetailPage