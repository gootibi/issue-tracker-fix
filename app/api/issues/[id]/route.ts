import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const body = await request.json();

    // Validation de body data
    const validation = issueSchema.safeParse(body)

    // if the data is not valid return the error
    if (!validation.success) {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }

    // Search in database with params ID
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    // The ID not found in database, return the error 'Invalid ID, issue', issue not found
    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
    }

    // Update the database whit prisma
    const updatedIssue = await prisma.issue.update({
        where: { id: issue.id },
        data: {
            title: body.title,
            description: body.description
        }
    })
    // The issue is valid, return the issue data
    return NextResponse.json(updatedIssue)
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {
        
    //await delay(2000) // Delete issue button Spinner loading component test

    // Search in database with params ID
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    // The ID not found in database, return the error 'Invalid ID, issue', issue not found
    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
    }

    // Delete issue in database whit prisma
    await prisma.issue.delete({
        where: { id: issue.id }
    })

    return NextResponse.json({})
}