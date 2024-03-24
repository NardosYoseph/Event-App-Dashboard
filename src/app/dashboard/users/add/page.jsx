"use client"
import { useRouter } from "next/navigation";
import { useState,useEffect } from 'react';
import User from '@/app/lib/models/user_model'; 
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import ProtectedRoute from "@/app/lib/protecteRoute";
import UserServices from '@/services/user_service';
import IntegrationServices from "@/services/ussd_report_service";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddUserPage = () => {
  const client = UserServices;
  const managerClient = IntegrationServices;

const router=useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  const user = new User(formData.username,formData.email, formData.password, formData.role);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [managers, setManagers] = useState([]);

  useEffect(() => {
    // Fetch managers when the component mounts
    const fetchManagers = async () => {
      try {
        const response = await managerClient.getGroupedEmail("MANAGER");
        setManagers(response);
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    fetchManagers();
  }, []); 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
      const response = await client.addUser(user);
        if (response.message && response.message.toLowerCase().includes('email already exists')) {
          toast.error('Email already exists', { position: 'top-right' });
        } else {
          toast.success('User added successfully', { position: 'top-right' });
          setTimeout(() => {
            router.push("/dashboard/users");
          }, 1000);
        }
  }
 const isOfficer= () =>{
   return formData.role=="OFFICER";
  }
  
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
    <div className={styles.container}>
    <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
  <input type="text" placeholder="username" name="username" required onChange={handleChange}/>
  <input type="email" placeholder="email" name="email" required onChange={handleChange}/>
  <input type="password" placeholder="password" name="password" required onChange={handleChange}/>
  
  <select name="role" id="role" value={formData.role} onChange={handleChange}>
    <option value={false}>Role</option>
    <option value="ADMIN">ADMIN</option>
    <option value="USER">USER</option>
    <option value="EVENT_ORGANIZER">EVENT_ORGANIZER</option>
  </select>
  <button type="submit">Submit</button>
</form>

    </div>
     </ProtectedRoute>
  );
};

export default AddUserPage;
