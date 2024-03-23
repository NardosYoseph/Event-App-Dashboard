"use client";
import { useState } from 'react';
import { useContext } from 'react';
import styles from "./loginForm.module.css";
import { useRouter } from 'next/navigation';
import { AuthContext } from "@/app/lib/userAuth";
import ApiClient from '@/app/lib/HttpRequestManager/api_client';
import jwt_decode from 'jsonwebtoken/decode';
import UserServices from '@/services/user_service';
import Link from 'next/link';


const ForgotPasswordForm = () => {
  const client = ApiClient.getInstance();
  const { handleLogin} = useContext(AuthContext);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(credentials);
      const response = await UserServices.forgotPassword(credentials);
      router.push("/otpForm")
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
 
    <form className={styles.form} onSubmit={handleSubmit}>
      <img src="/loginlogo.png" alt="Company Logo" />
      {/* <h1>Login</h1> */}
      <input type="text" placeholder="email" name="email" required onChange={handleChange}/>
      <button type='submit'>Send Code</button>
     
    </form>
   
  );
};

export default ForgotPasswordForm;
