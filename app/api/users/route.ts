/* GET Users endpiont created */

import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    // Get users (order by) from database
    const users = await prisma.user.findMany({ orderBy: { name: 'asc' } })

    // Return users data
    return NextResponse.json(users)
}