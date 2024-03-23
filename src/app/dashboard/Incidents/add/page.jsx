"use client"
import React, { useEffect, useState } from 'react';
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import ProtectedRoute from "@/app/lib/protecteRoute";
import UserServices from "@/services/user_service";
import PaginationManager from '@/app/lib/pagination_manager';
import IncidentServices from '@/services/event_service';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddIncidentPage = () => {
  const router=useRouter();
  const userClients = UserServices;
  const incidentClient = IncidentServices;
  const [pgManager, setPagination] = useState(new PaginationManager());
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    incident_name: '',
    status: 'Open',
    description: '',
    priority: '',
    user_id: '',
    imageFile: null,
    comment: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  useEffect(() => {
    const fetchUsers = async () => {
      
        const userPage = await userClients.getAllUsers();
        const userData = userPage.data;
        setUsers(userData);
    };

    fetchUsers();
  }, [userClients]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      imageFile: file,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   
      const formDataToSend = new FormData();
      formDataToSend.append('incident_name', formData.incident_name);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('priority', formData.priority);
      formDataToSend.append('comment', formData.comment);
      formDataToSend.append('imageFile', formData.imageFile);
      const response = await incidentClient.addIncidents(formData.user_id, formDataToSend);
      console.log("Here is response,",response)
       if(response){
        toast.success('Incident added successfully', { position: 'top-right' });
        setTimeout(() => {
          router.push('/dashboard/Incidents');
        }, 1000);  
        
       }
        else{
          toast.error('Unable to add Incident', { position: 'top-right' });
        }
  };
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
      <div className={styles.container}>
      <ToastContainer />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="incident_name"
            name="incident_name"
            required
            onChange={handleChange}
          />
          <select name="priority" id="priority" required onChange={handleChange}>
            <option value="">Choose Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select required
            name="user_id"
            id="user_id"
            value={formData.user_id}
            onChange={handleChange}
          >
            <option value="">Choose Assigned Person</option>
            {users && users.length > 0 && users.map(user => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="imageFile"
            accept="image/*"
            onChange={handleImageChange}
          />
          <textarea
            value={formData.description}
            name="description"
            required
            rows={16}
            onChange={handleChange}
            placeholder="Write your description here"
          />
          <button type="submit">Submit</button>
          {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default AddIncidentPage;