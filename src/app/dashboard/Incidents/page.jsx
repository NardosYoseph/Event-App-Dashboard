"use client"
import { useEffect, useState } from 'react';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/incidents/incident.module.css';
import Link from 'next/link';
import PaginationManager from '@/app/lib/pagination_manager';
import IncidentServices from '@/services/event_service';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
//import Select from 'react-select'; // Import react-select
import Filter from '@/app/ui/dashboard/filter/filter'

const IncidentPage = () => {
  const client=IncidentServices;
  const [loader,setLoader]=useState(false);

  const downloadPdf=async ()=> {
    const capture = document.querySelector(".print");

    const pdfOptions = {
      margin: 10,
      filename: 'ussdReport.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
    };
  
    try {
      const pdfOutput = await html2pdf(capture, pdfOptions);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  

  const [incidents, setIncidents] = useState([]);
  //const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');
  const [firstnameQuery, setFirstnameQuery] = useState('');
  const [lastnameQuery, setLastnameQuery] = useState('');
  const [pgManager, setPagination] = useState(new PaginationManager());
  const [visibleImageId, setVisibleImageId] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  
  const getSelectedPriority = () => {
    // Implement logic to get selected priority, for example from state
    return selectedPriority;
  };

  const getSelectedStatus = () => {
    // Implement logic to get selected status, for example from state
    return selectedStatus;
  };
  const toggleImageVisibility = (id) => {
    setVisibleImageId((prevId) => (prevId === id ? null : id));
  };


 
  const fetchIncidents = async (pageNumber) => {
    const paginatedData = await client.getIncidents(pageNumber ?? pgManager.getCurrentPage, pgManager.getTotalItems);
    pgManager.setData(paginatedData?.data);
    setPagination(pgManager);
    const incidentsData = pgManager.getData;
    setIncidents(incidentsData);   
  
}
  
  const statusOptions = [
    { value: '', label: 'All' },
    { value: 'Open', label: 'Open' },
    { value: 'Closed', label: 'Closed' },
    { value: 'Pending', label: 'Pending' },
  ];
  const priorityOptions = [
    { value: '', label: 'All' },
    { value: 'Low', label: 'Low' },
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
  ];
 
  const handleSearch = async (searchTerm, pageNumber) => {
    if (!searchTerm) {
      // If the search input is empty, fetch the original incident list
      await fetchIncidents();
      return;
    }
      const response = await client.getIncidentsSearch(
        searchTerm,
        pageNumber ?? pgManager.getCurrentPage,
        pgManager.getTotalItems
      );
  
      pgManager.setData(response?.data);
      setPagination(pgManager);
      const searchResults = pgManager.getData;
      if (searchResults && searchResults.length > 0) {
        setIncidents(searchResults);
        setPagination(pgManager); // Reset pagination for new search results
      } else {
        setIncidents([]); // Reset incidents state if no search result
        setPagination(pgManager); // Reset pagination for new search results
      }
  };
  
  const handleFilterChange = async (selectedFilter) => {
    console.log("Filtering with value:", selectedFilter);
    if (!selectedFilter) {
      // If the default option is selected, fetch all incidents
      await fetchIncidents();
      return;
    }
      let response;
      const selectedPriority = getSelectedPriority();
      const selectedStatus = getSelectedStatus();
      if (selectedFilter.includes("Priority:")) {
        const selectedPriorityValue = selectedFilter.replace("Priority:", "");
        response = await client.getIncidentsFilter(selectedPriorityValue, selectedStatus);
        setSelectedPriority(selectedPriorityValue);
      } 
       if (selectedFilter.includes("Status:")) {
        const selectedStatusValue = selectedFilter.replace("Status:", "");
        response = await client.getIncidentsFilter(selectedPriority, selectedStatusValue);
        setSelectedStatus(selectedStatusValue);
      }
      console.log("Full API Response:", response);
      const filterResults = response?.data?.pageData;
  
      console.log("Filter response:", filterResults);
  
      if (filterResults && filterResults.length > 0) {
        setIncidents(filterResults);
        // Reset pagination for new search results
      } else {
        setIncidents([]); // Reset incidents state if no search result
      }
  };
  useEffect(() => {
    fetchIncidents();
  }, []);
  
  const handlePageChange = async (pageNumber) => {
      fetchIncidents(pageNumber);
      //console.log("Here si the dataaaaa",fetchIncidents)
  };
 
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search
          placeholder="Search for an incident..."
          onSearch={(searchTerm) => handleSearch(searchTerm)}
          //onSearch={handleSearch}
        />
        <Filter className={styles.top}
  statusOptions={statusOptions}
  priorityOptions={priorityOptions}
  onStatusFilterChange={(statusValue) => handleFilterChange(`Status: ${statusValue}`)}
  onPriorityFilterChange={(priorityValue) => handleFilterChange(`Priority: ${priorityValue}`)}
  currentPage={pgManager.getCurrentPage}
/>

<div class="form-group">
          <select name="export" id="export">
            <option value="pdf" >PDF</option>
          </select>
          <button className={styles.button} onClick={downloadPdf}>Export</button>
        </div>
        <Link href="/dashboard/Incidents/add">
          <button className={styles.addButton}>Create New</button>
        </Link>
      </div>
      <div className="print">
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Incident Name</th>
              <th>Status</th>
              <th>Description</th>
              <th>Priority</th>
              {/* <th>Created At</th>
              <th>Solved At</th> */}
             <th>Assigned To</th>
             <th>Image</th>
              <th>Actions</th>
             
              {/* <th>Comment</th> */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(incidents) && incidents.length > 0 ? (
              incidents.map((incident,index) => {
                const key = incident.id || index;
                const assignedTo = incident.assignedUser && incident.assignedUser.id
                  ? `${incident.assignedUser.firstname} ${incident.assignedUser.lastname} "[${incident.assignedUser.email}]"`
                  : 'N/A';

                return (
                  <tr key={key}>
                    <td>{incident.incident_name}</td>
                    <td>{incident.status}</td>
                    <td>{incident.description}</td>
                    <td>{incident.priority}</td>
                    {/* <td>{incident.created_at}</td>
                    <td>{incident.solved_at}</td> */}
                    <td>{assignedTo}</td> 
                   
                    <td>
                      <div>
                        {incident.imageData && (
                          <button className={`${styles.button}`} onClick={() => toggleImageVisibility(incident.id)}>
                            {visibleImageId === incident.id ? <FaEyeSlash /> : <FaEye />}
                          </button>
                        )}
                        {incident.imageData && visibleImageId === incident.id && (
                          <img
                            src={`data:image/png;base64,${incident.imageData}`}
                            alt={`Image for ${incident.name}`}
                            style={{ maxWidth: '100px', cursor: 'pointer' }}
                            onClick={() => toggleImageVisibility(incident.id)}
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <div className={styles.buttons}>
                        <Link href={`/dashboard/Incidents/update/${incident.id}`}> 
                          <button className={`${styles.button} ${styles.view}`}>Update</button>
                        </Link> 
                        <Link href={`/dashboard/Incidents/view/${incident.id}`}> 
                          <button className={`${styles.button} ${styles.view}`}>View</button>
                        </Link>
                        {/* <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(incident.id)}>Delete</button> */}
                      </div>
                    </td>
                    {/* <td>{incident.comment}</td> */}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10">No Incidents found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <Pagination pgManager={pgManager} handlePageChange={handlePageChange} />
      </div>
    </div>
  );
};
export default IncidentPage;