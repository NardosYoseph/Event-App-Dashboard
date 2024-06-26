"use client"
import { AuthProvider } from "@/app/lib/userAuth";
import React from 'react';
import { Inter } from 'next/font/google'
import './ui/globals.css'
import ApiClient from '@/app/lib/HttpRequestManager/api_client';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/app';
import 'firebase/storage'; // Include required services
import { firebaseConfig } from './firebaseConfig';
//import { signInAnonymously } from '../app/dashboard/Incidents/add/page';
import { getAuth } from 'firebase/auth';

const inter = Inter({ subsets: ['latin'] })
// export const metadata = {
//   title: 'Aba Incident Tracking',
//   description: 'Generated by create next app',
// }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 

// Pass the auth object to signInAnonymously
//signInAnonymously(auth);
export default function RootLayout({ children }) {
 // firebase.initializeApp(firebaseConfig);

  ApiClient.initialize('https://event-app-back-end.onrender.com/api'); 
  //console.log(ApiClient.getInstance());
  return (

    <html lang="en">
  <AuthProvider>
      <body className={inter.className}>
        {children}
        </body>
        </AuthProvider>
    </html>

  )
}
