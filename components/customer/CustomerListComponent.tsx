'use client'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Link from "next/link";
import styles from "@/components/components.module.css"
import {ICustomer} from "@/models/customer";
import {useSession} from "next-auth/react";
import {Schema} from "mongoose";

//rsf

interface PageProps {
    customers: ICustomer[],
}

const CustomerListComponent: React.FC<PageProps> = (props) => {


    return <section>

        <div className={styles.pageContainer}>
            <h1><span> Customer List</span></h1>
            {
                <table>
                    <thead>
                    <tr>
                        <th key={"cl-name"}>Name</th>
                        <th key={"cl-Surname"}>Surname</th>
                        <th key={"cl-Phone"}>Phone</th>
                        <th key={"cl-Address"}>Address</th>
                        <th key={"cl-Edit"}>Edit</th>
                        <th key={"cl-Delete"}>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.customers?.map((customer,index) =>
                        (<tr key={"cus-"+index + customer.name}>
                                <td>{customer.name}</td>
                                <td>{customer.surname}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>Edit</td>
                                <td>Delete</td>
                                {customer.name}
                        </tr>
                        )
                    )}
                    </tbody>
                </table>

            }
            <div className={styles.row}>

            </div>
        </div>


    </section>

}
export default CustomerListComponent;