import { NextRequest, NextResponse } from "next/server";
import {z} from 'zod';

import prisma from "@/prisma/client";

const schema = z.object({
    title : z.string().min(1).max(255),
    description: z.string().min(1),
    authorId: z.number()
})
export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        const validation = schema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(validation.error.errors, { status: 400 });
        }

        const newIssue = await prisma.issue.create({
            data: {
                title: body.title,
                description: body.description,
                // Assuming there's a 'status' field in your database model, adjust accordingly
                status: body.status,
                authorId: body.authorId
            }
        });

        return NextResponse.json(newIssue, { status: 201 });
    } catch (error) {
        console.error("Error creating new issue:", error);
        return NextResponse.json("Internal Server Error", { status: 500 });
    }
}
