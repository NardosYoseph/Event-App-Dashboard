"use client"
import styles from "@/app/ui/login/ForgotPasswordForm/loginForm.module.css";
import LoginForm from "../ui/login/loginForm/loginForm";
import { useEffect } from 'react';
import ForgotPasswordForm from "../ui/login/ForgotPasswordForm/ForgotPasswordForm";


const ForgotPasswordPage = () => {
  return (
    <div className={styles.container}>
      <ForgotPasswordForm/>
    </div>
  );
};

export default ForgotPasswordPage;
