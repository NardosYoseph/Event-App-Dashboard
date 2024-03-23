"use client"
import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import { useEffect } from 'react';
import Footer from "../ui/dashboard/footer/footer";

const LoginPage = () => {

  return (
    <div className={styles.container}>   
      <LoginForm/>
      <Footer/>
    </div>
   
  );
};

export default LoginPage;
