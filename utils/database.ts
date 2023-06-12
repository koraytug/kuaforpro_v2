import * as mongoose from "mongoose";

let isConnected = false; //track connection status

export async function connectToDb() {
    mongoose.set('strictQuery', true)
    if (isConnected) {
        console.log("MongoDB is already connected!");
        return;
    }


    try {
        console.log('trying to connect MongoDB');

        const uri = await process.env.MONGODB_URI ?? "";

        await mongoose.connect(uri, {
                dbName: "TESTAPP"
            }
        )
        isConnected = true;

        console.log('MongoDB connected');
    } catch (error) {
        console.log(error);
    }
}

