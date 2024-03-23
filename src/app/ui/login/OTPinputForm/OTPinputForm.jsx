"use client"
import React, { useState } from 'react';
import {useRouter} from "next/navigation";
import userService from '@/services/user_service';
import styles from "./loginForm.module.css";
const OTPinputForm = () => {
  const router = useRouter();

 // const client = userService;
 // const { handleLogin} = useContext(AuthContext);

  const [otp, setOTP] = useState('');
  const handleChange = (e) => {
  setOTP(e.target.value);  
    }
 


  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.setItem('otp',otp);
    router.push("/setPassword")
 
  };

  

 
  return (
    <div>
      <h2>Enter 6-digit OTP</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
       
            <input
  
              type="text"
              maxLength="6"
              onChange={handleChange}
              // style={{ width: '40px', height: '40px', textAlign: 'center', fontSize: '16px', margin: '0 5px', border: '1px solid #ccc', borderRadius: '5px' }}
              required
            />
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default OTPinputForm;
