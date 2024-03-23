"use client"
import { useState, useEffect } from 'react';
import IncidentServices from '@/services/event_service';
import styles from '@/app/ui/dashboard/incidents/view/view.module.css';

const IncidentViewPage = ({ params }) => {
  const { id } = params;
  const client = IncidentServices;

  const [incidentData, setIncidentData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await client.getIncidentById(id);
        console.log('This is incident list', response);

        const incident = response.data || {};
        console.log('This is incident reponse', incident);
        if (incident) {
          setIncidentData({
            incident_name: incident.incident_name || '',
            incident_id: incident.id || '',
            status: incident.status || '',
            description: incident.description || '',
            priority: incident.priority || '',
            created_at: incident.created_at || '',
            solved_at: incident.solved_at || 'Not solved',
            comment: incident.comment || '',
            assignedPerson:incident.assignedUser.firstname || '',
            assignedPersonEmail:incident.assignedUser.email || '',

          });
        } else {
          setErrorMessage('Incident data not found');
        }
      } catch (error) {
        console.error('Error fetching incident:', error);
        setErrorMessage('Error fetching incident');
      }
    };

    fetchIncident();
  }, [id]);

  const escalateIncident = async (id) => { 
    const escalate = await client.escalateIncident(id);
 
};
  

  const isAssignedPerson = () => {
    return localStorage.getItem('userEmail') === incidentData.assignedPersonEmail;
  };
  const isClosed=()=>{
    return incidentData.status=="Closed";
  }
  return (
    <div className={styles.container}>
      <div className={styles.view}>
        <h1>Incident Details</h1>
        <div className={styles.list}>
          <strong >Name:</strong> {incidentData.incident_name}
        </div>
        <div className={styles.list}>
          <strong>Status:</strong> {incidentData.status}
        </div>
        <div className={styles.list}>
          <strong>Description:</strong> {incidentData.description}
        </div>
        <div className={styles.list}>
          <strong>Priority:</strong> {incidentData.priority}
        </div>
        <div className={styles.list}>
          <strong>Created at:</strong> {incidentData.created_at}
        </div>
        <div className={styles.list}>
          <strong>Solved At:</strong> {incidentData.solved_at}
        </div>
        <div className={styles.list}>
          <strong>Comment:</strong> {incidentData.comment}
        </div>
        <div className={styles.list}>
          <strong>Assigned person:</strong> {incidentData.assignedPerson}
        </div>
        <div className={styles.list}>
          {(!isClosed() && isAssignedPerson() )&& (
            <button className={styles.button} onClick={() => escalateIncident(incidentData.incident_id)}>Escalate</button>
           )} 
        </div>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      </div>
    </div>
  );
};

export default IncidentViewPage;
