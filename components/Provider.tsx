"use client"
import React, {ReactNode} from "react";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";

interface MyProps {
    children?: ReactNode;
    session:Session;
}
export default function Provider(props:MyProps) {
    return (
        <SessionProvider session={props.session}>
            {props.children}
        </SessionProvider>
    );
}