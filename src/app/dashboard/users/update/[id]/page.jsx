"use client"
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import styles from '@/app/ui/dashboard/incidents/updateincident/updateincident.module.css';
import UserServices from '@/services/user_service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserPage = ({ params }) => {
  const { id } = params;
  const router=useRouter();
  console.log("here is the id,", id)
const client=UserServices;
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    role: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
        const response = await client.getUserById(id);

        const user = response.data || {};
        if (user) {
          setFormData({
            firstname: user.firstname || '',
            lastname: user.lastname || '',
            email: user.email || '',
            role: user.role || '',
          });
        } else {
          setErrorMessage('User data not found');
        } 
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        const response = await client.updateUser(id, formData); // Pass formData
        if(response){
          toast.success('User Updated successfully', { position: 'top-right' });
          setTimeout(() => {
            router.push('/dashboard/users');
          }, 1000);  
          
         }
          else{
            toast.error('Unable to Update User', { position: 'top-right' });
          }    
};
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          id="firstname"
          required
          value={formData.firstname}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          id="lastname"
          required
          value={formData.lastname}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          onChange={handleChange}
        />
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="">Choose role</option>
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
        </select>
        <button type="submit">Update</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UpdateUserPage;

