"use client"
import NavBar from "../ui/dashboard/navbar/navbar"
import Footer from "../ui/dashboard/footer/footer"
import SideBar from "../ui/dashboard/sidebar/sidebar"
import styles from "../ui/dashboard/dashboard.module.css"
import { useRouter } from "next/navigation"
//import Footer from "../ui/dashboard/footer/footer"

import {AuthContext}  from "../lib/userAuth";
import React, { useContext } from 'react';

const Layout=({children})=>{
    const router=useRouter();
    // const { isAuthenticated } = useContext(AuthContext);
    // if(!isAuthenticated){
    // router.push("/login");
    // }
    return(
    <div className={styles.container}>
        <div className={styles.menu}>
            <SideBar/>
        </div>
        <div className={styles.content}>
        <NavBar/>
        {children}
      </div>
 
    </div>
    )}

export default Layout