"use client"
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import IncidentServices from '@/services/incident_service';
import styles from '@/app/ui/dashboard/incidents/updateincident/updateincident.module.css';
import UserServices from '@/services/user_service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateIncidentPage = ({ params }) => {
  const { id } = params;
  const router=useRouter();
const client=IncidentServices;
const userClients = UserServices;
const[users,setUsers]=useState();
  const [formData, setFormData] = useState({
    incident_name: '',
    status: '',
    description: '',
    priority: '',
    userId:'',
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
  useEffect(() => {
    const fetchIncident = async () => {
      
        const response = await client.getIncidentById(id);
        const incident = response.data || {};
        console.log("Here data",incident)
        if (incident) {
          setFormData({
            incident_name: incident.incident_name || '',
            status: incident.status || '',
            description: incident.description || '',
            priority: incident.priority || '',
            userId: incident.assignedUser.id || '',
          });
        } else {
          setErrorMessage('Incident data not found');
        }    
    };

    fetchIncident();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
        const response = await client.updateIncidents(id, formData); 
        if(response){
          toast.success('Incident Updated successfully', { position: 'top-right' });
          setTimeout(() => {
            router.push('/dashboard/Incidents');
          }, 1000);    
         }
          else{
            toast.error('Unable to Update Incident', { position: 'top-right' });
          }     
};
  return (
    <div className={styles.container}>
      <ToastContainer/>
      <form className={styles.form} onSubmit={handleSubmit}>
        
        <input
          type="text"
          name="incident_name"
          id="incident_name"
          required
          
          value={formData.incident_name}
          onChange={handleChange}
        />
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="">Choose Status</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
          <option value="Pending">Pending</option>
        </select>
        <select
   name="userId"
   id="userId"
   value={formData.userId}
   onChange={handleChange}
>
   <option value="">Choose Assigned Person</option>
   {users && users.length > 0 && users.map(user => (
      <option key={user.id} value={user.id}>
         {user.email}
      </option>
   ))}
</select>
        <textarea
          value={formData.description}
          name="description"
          required
          onChange={handleChange}
        />
        <select
          name="priority"
          id="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="">Choose Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <button type="submit">Update</button>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default UpdateIncidentPage;
