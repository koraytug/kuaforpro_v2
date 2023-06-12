import {NextRequest, NextResponse} from "next/server";
import {connectToDb} from "@/utils/database";
import Customer from "@/models/customer";


export const GET = async (req: NextRequest , res: NextResponse) => {
    try {
        await connectToDb();

        const prompts = await Customer.find({}).populate('creator');

        new NextResponse(JSON.stringify(prompts), {status: 200});
    } catch (error) {
        console.log("GET error");
        return new NextResponse("Failed to fetch all prompts", {status: 500});
    }
}