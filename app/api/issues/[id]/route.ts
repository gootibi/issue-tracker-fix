import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
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
    // The ID not found in database, return the error 'Invalid ID os issue', issue not found
    if (!issue) {
        return NextResponse.json({ error: 'Invalid issue' }, { status: 404 })
    }
    // Update de database whit prisma
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