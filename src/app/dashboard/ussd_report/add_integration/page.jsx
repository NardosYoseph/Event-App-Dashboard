"use client"
import { useRouter } from "next/navigation";
import { useState } from 'react';
import Integration from '@/app/lib/models/integration_model'; 
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import UssdReportService from '@/services/ussd_report_service';

const AddIntegrationPage = () => {
  const client = UssdReportService;
const router=useRouter();
  const [formData, setFormData] = useState({
   
    apiIntegrationName: '',
    ipAddress: ''
  });
  const integration = new Integration(formData.apiIntegrationName, formData.ipAddress);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await client.addIntegration(integration);
  
 router.push("/dashboard/ussd_report");
  };

  return (
 
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
     
        <input type="text" placeholder="apiIntegrationName" name="apiIntegrationName" required onChange={handleChange}/>
        <input type="text" placeholder="ipAddress" name="ipAddress" required onChange={handleChange}/>
      
        
        <button type="submit">Submit</button>
      </form>
    </div>

  );
};

export default AddIntegrationPage;
