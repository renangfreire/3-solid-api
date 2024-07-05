import 'dotenv/config'

import { randomUUID } from "crypto";
import { Environment } from "vitest";
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()


function generateDbPath(schema: string){
    if(!process.env.DATABASE_URL){
        throw new Error("Please provide a DATABASE_URL environment variable")
    }


    // Forma Defauld de fazer
    // const equalIndex = process.env.DATABASE_URL.indexOf("=")
    // const url = process.env.DATABASE_URL.substring(0, equalIndex + 1 )
    // return url + schema

    // Com URL API
    const url = new URL(process.env.DATABASE_URL)
    url.searchParams.set("schema", schema)

    return url.toString()
}

export default <Environment>{
    name: "prisma",
    transformMode: 'ssr',
    setup(){
        const schema = randomUUID();

        process.env.DATABASE_URL = generateDbPath(schema)

        execSync("npx prisma migrate deploy")

        return {
            async teardown(){
                await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schema}" CASCADE`)
                await prisma.$disconnect()
            }
        }
    }
} 