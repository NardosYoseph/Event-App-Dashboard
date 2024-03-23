"use client";
import { useState } from 'react';
import { useContext } from 'react';
import styles from "./loginForm.module.css";
import { useRouter } from 'next/navigation';
import { AuthContext } from "@/app/lib/userAuth";
import ApiClient from '@/app/lib/HttpRequestManager/api_client';
import jwt_decode from 'jsonwebtoken/decode';
import UserServices from '@/services/user_service';


const SetPasswordForm = () => {
  const client = UserServices;
  const { handleLogin} = useContext(AuthContext);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    newPassword: '',
    confirmPassword: '',
    otp: localStorage.getItem('otp'),
  });
 
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.newPassword === credentials.confirmPassword) {
        const { confirmPassword, ...dataToSend } = credentials;
        console.log(dataToSend);
        const response = await client.setPassword(dataToSend);
        console.log(response);
        router.push("/login");
    } else {
      console.error('Passwords do not match!');
    }
   
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <img src="/loginlogo.png" alt="Company Logo" />
      {/* <h1>Login</h1> */}
      <input type="password" placeholder="new password" name="newPassword" required onChange={handleChange}/>
      <input type="password" placeholder="confirm password" name="confirmPassword" required onChange={handleChange}/>
      <button type='submit'>Submit</button>
     
    </form>
   
  );
};

export default SetPasswordForm;