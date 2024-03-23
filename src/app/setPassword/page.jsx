"use client"
import styles from "@/app/ui/login/login.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import { useEffect } from 'react';
import SetPasswordForm from "../ui/login/SetPasswordForm/SetPasswordForm";


const SetPasswordPage = () => {

  return (
    <div className={styles.container}>
     
      <SetPasswordForm/>
    </div>
  );
};

export default SetPasswordPage;
