'use client'
import {ReactNode, useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {ICreateCustomerPostBody, ICustomer} from "@/models/customer";
import CustomerListComponent from "@/components/customer/CustomerListComponent";


interface MyProps {
    children?: ReactNode;
}

const CustomerList = async (props: MyProps) => {
    // const {data: session} = useSession();
    // const router = useRouter();

    const [customers, setCustomers] = useState([]);
    const EmptyCustomer: ICustomer = {
        name: "",
        surname: "",
        address: "",
        phone: "",
        creator: "",
        createDate: "",
    };
    useEffect(() => {
        fetchCall();
    }, [])


    const fetchCall = async () => {
        fetch('/api/customer/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(async (response) => {
            console.log("fetchCall worked", response);
            setCustomers(JSON.parse(await response.json()));
            console.log("fetchCall worked2", response);
            // if (response.ok) {
            //    // router.push('/');
            // }
        });
        // return response;
    }


    return (
        <div>
            <CustomerListComponent customers={customers}/>
        </div>
    );
};

export default CustomerList;