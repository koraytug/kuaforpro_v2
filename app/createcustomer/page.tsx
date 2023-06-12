'use client'
import {ReactNode, useEffect, useState} from 'react';
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {ICreateCustomerPostBody, ICustomer} from "@/models/customer";
import CustomerForm from "@/components/customer/CustomerForm";


interface MyProps {
    children?: ReactNode;
}

const CreateCustomer = async (props: MyProps) => {
    const {data: session} = useSession();
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const EmptyCustomer: ICustomer = {
        name: "",
        surname: "",
        address: "",
        phone: "",
        creator:"",
        createDate: "",
    };
    const [customer, setCustomer] = useState(EmptyCustomer);
    const updateCustomer = (val: ICustomer) => {
        setCustomer(val); 
    }

    const  fetchCall = async (body: ICreateCustomerPostBody)=> {
        fetch('/api/customer/new', {
            method: 'POST',
            body: JSON.stringify({body}),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then((response)=>{
            console.log("fetchCall worked",response);
            if (response.ok) {
                router.push('/');
            }
        });
        // return response;
    }

    const createPrompt = async (customerVal:ICustomer ) => {
        // e.preventDefault();
        console.log("1 :" + submitting);
        setSubmitting(true);
        try {
            const body:ICreateCustomerPostBody ={
                name: customerVal.name,
                creator:session?.user?.name ?? "",
                address: customerVal.address,
                phone: customerVal.phone,
                surname: customerVal.surname
            }
            fetchCall(body);
            router.push('/');
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <div>
            <CustomerForm
                type="create"
                customer={customer}
                setCustomer={updateCustomer}
                submitting={submitting}
                handleSubmit={createPrompt}
            />
        </div>
    );
};

export default CreateCustomer;