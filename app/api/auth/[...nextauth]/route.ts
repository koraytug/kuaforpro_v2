import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {DefaultSession, Session} from "next-auth/src/core/types";
import User from "@/models/user";
import {connectToDb} from "@/utils/database";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        })
    ],
    callbacks: {
        async session({session}) {
            // const sessionUser = await User.findOne({
            //     email: session?.user?.email
            // })
            // console.log("session callback");

            return session;
        },
        async signIn({account, profile}): Promise<boolean> {
            try {
                await connectToDb();

                //check if a user already exists
                const userExist = await User.findOne({
                    email: profile?.email
                });
                //if not, create a new user
                if (!userExist) {

                    await User.create({
                        email: profile?.email,
                        username: profile?.name?.replace(" ", "").replace("ğ","g").toLowerCase(),
                        image:  profile?.image ?? ""
                    })

                }

                return true;
            } catch (error) {
                console.log(error);
                console.log("signIn error");

                return false;
            }
            return true;
        },
    },


})

export {handler as GET, handler as POST}