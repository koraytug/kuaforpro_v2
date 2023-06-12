import {NextRequest, NextResponse} from "next/server";
import {connectToDb} from "@/utils/database";
import Customer from "@/models/customer";

export const POST = async (req: NextRequest, res: NextResponse) => {
    // const {userId, prompt, tag} = JSON.parse(await req.text()).body;
    const {
         name, surname, address, phone, creator, createDate
    } = JSON.parse(await req.text()).body;
    try {
        await connectToDb();
        console.log("Post 1");
        const newCustomer = new Customer({
            creator:creator.replace(" ", "").replace("ğ", "g").toLowerCase(),
            name, surname, address, phone, createDate:new Date()
        });
        console.log("Post 2");
        await newCustomer.save();
        console.log("Post 3");
        const json_response = {
            status: "success",
            data: {
                newPrompt: newCustomer,
            },
        };
        console.log("Post 4");
        return new NextResponse(JSON.stringify(json_response), {
            status: 201,
            headers: {"Content-Type": "application/json"},
        });

    } catch (error) {
        console.log("POST error");
        return new NextResponse("Failed to create a new customer", {status: 500});
    }
}