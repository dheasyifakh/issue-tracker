import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";


export async function POST(request: NextRequest){
    try{
        const {email, password} = await request.json()
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
            },
          })
          
    }catch(err){

    }
}