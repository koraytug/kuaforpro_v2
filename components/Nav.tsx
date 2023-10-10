"use client"
import Link from "next/link";
import Image from "next/image";
import styles from "@/components/components.module.css"
import {useState, useEffect} from "react";
import {signIn, signOut, useSession, getProviders} from "next-auth/react"
// import logo from "../public/koko_logo.png"
export default function Nav() {
    // const isUserLoggedIn = true;
    const {data: session} = useSession();
    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggledropdown] = useState(false)
    useEffect(() => {
        const setUpProviders = async () => {
            const response = await getProviders();
            // @ts-ignore
            setProviders(response);
        }
        setUpProviders() ;
    }, []);
    return (
        <nav className={styles.navbar}>
            <div className={styles.col}>
                <Link href="/">
                    <Image src="/koko_logo.png"
                           alt="KuaforPRO Logo"
                           width={40} height={40}>
                    </Image>
                </Link>
            </div>
            <div className={styles.navCenter}>
                <p>KuaforPRO</p>
            </div>
            <div className={styles.col}>

                <>{
                    session?.user ? (
                            <div className={styles.navRight}>
                                <div className={styles.col}>
                                    <Link href="/customerlist">Customer List</Link>
                                </div>
                                <div className={styles.col}>
                                    <Link href="/createcustomer">Create Customer</Link>
                                </div>
                                <div className={styles.col}>
                                    <button type="button" onClick={() => signOut}>Sign Out</button>
                                </div>
                                <div className={styles.col}>
                                    {/*<Link href="/profile">*/}
                                    <Image
                                        src={session?.user.image||""}
                                        width={37}
                                        height={37}
                                        alt="Profile"
                                        onClick={() => setToggledropdown((prev) => !prev)}
                                    />
                                    {toggleDropdown && (
                                        <div className={styles.col}>
                                            <Link
                                                href="/profile"
                                                onClick={() => setToggledropdown(false)}
                                            >
                                                My Profile
                                            </Link>
                                            <Link
                                                href="/create-prompt"
                                                onClick={() => setToggledropdown(false)}
                                            >
                                                Create Prompt
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setToggledropdown(false);
                                                    signOut();
                                                }}
                                            >
                                                SignOut
                                            </button>
                                        </div>
                                    )}
                                    {/*</Link>*/}
                                </div>

                                {/*<button type="button" onClick={signOut}></button>*/}

                            </div>

                        ) :
                        (<>
                            {
                                providers && Object.values(providers).map((provider: any) => {
                                    return (
                                        <button
                                            type="button"
                                            key={provider.name}
                                            onClick={() => signIn(provider.id)}
                                        >Sign In</button>
                                    )
                                })
                            }

                        </>)
                }
                </>
            </div>


        </nav>
    );
}