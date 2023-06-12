'use client'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import Link from "next/link";
import styles from "@/components/components.module.css"
import {ICustomer} from "@/models/customer";
import {useSession} from "next-auth/react";
import {Schema} from "mongoose";

//rsf

interface PageProps {
    type: string,
    customer: ICustomer,
    setCustomer: any
    submitting: boolean
    handleSubmit: (customer: ICustomer) => Promise<void>
}

const CustomerForm: React.FC<PageProps> = (props) => {
    const EmptyCustomer: ICustomer = {
        name: "",
        surname: "",
        address: "",
        phone: "",
        creator: "",
        createDate: "",
    };
    const {data: session} = useSession();
    const [customer, setCustomerValue] = useState(EmptyCustomer);
    const [name, setNameValue] = useState(props.customer.name);
    const [surname, setSurnameValue] = useState(props.customer.surname);
    const [phone, setPhoneValue] = useState(props.customer.phone);
    const [address, setAddressValue] = useState(props.customer.address);

    useEffect(() => {
        props.setCustomer(customer);
    }, [customer]);

    function handlePostChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setNameValue(event.target.value)
    }

    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setNameValue(event.currentTarget.value);
    }

    function handleSurnameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSurnameValue(event.currentTarget.value);
    }

    function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPhoneValue(event.currentTarget.value);
    }

    function handleAddressChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setAddressValue(event.target.value)
    }

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // 👇️ prevent page refresh
        event.preventDefault();
        const newPost: ICustomer = {
            name,
            surname,
            address,
            phone,
            creator: session?.user?.name ?? "",
            createDate: new Date().toDateString()
        }
        setCustomerValue(newPost);
        props.setCustomer(newPost);
        await props.handleSubmit(newPost)
    };

    return (<section>

        <div className={styles.pageContainer}>
            <h1><span>{props.type} Customer</span></h1>
            <div className={styles.row}>
                <form onSubmit={handleFormSubmit}>
                    <div className={styles.col}>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <input
                                    onChange={handleNameChange}
                                    placeholder="Name"
                                    required={true}
                                    className={styles.formInputBox}
                                />
                            </div>
                            <div className={styles.col}>
                                <input
                                    onChange={handleSurnameChange}
                                    placeholder="Surname"
                                    required={true}
                                    className={styles.formInputBox}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <input
                                    className={styles.formInputBox}
                                    onChange={handlePhoneChange}
                                    placeholder="Phone"
                                    required={true}
                                />
                            </div>

                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <textarea
                                    className={styles.formAddressTextArea}
                                    onChange={handleAddressChange}
                                    placeholder="Write your Address here..."
                                    required={true}
                                />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div className={styles.col}>
                                <button
                                    className={styles.formCreateButton}
                                    type={"submit"}
                                    disabled={props.submitting}
                                >
                                    {props.submitting ? `${props.type}...` : props.type}
                                </button>
                            </div>
                            <div className={styles.col}>
                                <Link href="/" className={styles.formCancelButton}>Cancel</Link>
                            </div>
                        </div>
                    </div>


                </form>
            </div>
        </div>



    </section>);
}
export default CustomerForm;