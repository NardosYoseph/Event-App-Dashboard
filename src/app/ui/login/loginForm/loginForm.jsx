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


const LoginForm = () => {
  const client = ApiClient.getInstance();
  const { handleLogin} = useContext(AuthContext);
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
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
      const response = await UserServices.login(credentials);
      console.log(response);
      const token = response.token.accessToken;
      console.log(token)
            const refreshToken = response.refresh_token;
            const user = jwt_decode(token);
            client.setAuthorization(token);
            const role = user.user.role;
            localStorage.setItem('token', token);
            localStorage.setItem('userEmail', user.email);
            localStorage.setItem('refreshToken', refreshToken);
           localStorage.setItem('role', role);
            // console.log("here this is :",role);
            handleLogin(user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
 
    <form className={styles.form} onSubmit={handleSubmit}>
      <img src="/loginlogo.png" alt="Company Logo" />
      {/* <h1>Login</h1> */}
      <input type="text" placeholder="email" name="email" required onChange={handleChange}/>
      <input type="password" placeholder="password" name="password" onChange={handleChange}/>      
      
      <button>Login</button>
      <Link href="/forgotPassword">forgot password?</Link>
    </form>

  );
};

export default LoginForm;
