"use client"
import { useEffect, useState } from 'react';
import Pagination from '@/app/ui/dashboard/pagination/pagination';
import Search from '@/app/ui/dashboard/search/search';
import styles from '@/app/ui/dashboard/incidents/incident.module.css';
import Link from 'next/link';
import PaginationManager from '@/app/lib/pagination_manager';
import EventServices from '@/services/event_service';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import cardStyles from "@/app/ui/dashboard/card/card.module.css"
import cardContainerStyles from "@/app/ui/dashboard/dashboard.module.css";
import jsPDF from 'jspdf';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 
//import Select from 'react-select'; // Import react-select
import Filter from '@/app/ui/dashboard/filter/filter'

const IncidentPage = () => {
  const client=EventServices;
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
  

  const [events, setEvents] = useState([]);
  // //const [users, setUsers] = useState([]);
  // const [filter, setFilter] = useState('');
  // const [firstnameQuery, setFirstnameQuery] = useState('');
  // const [lastnameQuery, setLastnameQuery] = useState('');
  // const [pgManager, setPagination] = useState(new PaginationManager());
  // const [visibleImageId, setVisibleImageId] = useState(null);
  // const [selectedPriority, setSelectedPriority] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState(null);
  
  // const getSelectedPriority = () => {
  //   // Implement logic to get selected priority, for example from state
  //   return selectedPriority;
  // };

  // const getSelectedStatus = () => {
  //   // Implement logic to get selected status, for example from state
  //   return selectedStatus;
  // };
  const toggleImageVisibility = (id) => {
    setVisibleImageId((prevId) => (prevId === id ? null : id));
  };


 
  const fetchEvents = async () => {
    const eventData = await client.getEvents();
    console.log(eventData);
    if (eventData) { // Check if data exists
      const events = eventData.eventList;
      setEvents(events); // Update state with event list
    } else {
      console.error("Error fetching events or data not found");
      // Handle the case where data is not available
    }   
}
  
  // const statusOptions = [
  //   { value: '', label: 'All' },
  //   { value: 'Open', label: 'Open' },
  //   { value: 'Closed', label: 'Closed' },
  //   { value: 'Pending', label: 'Pending' },
  // ];
  // const priorityOptions = [
  //   { value: '', label: 'All' },
  //   { value: 'Low', label: 'Low' },
  //   { value: 'Medium', label: 'Medium' },
  //   { value: 'High', label: 'High' },
  // ];
 
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
  
      // pgManager.setData(response?.data);
      // setPagination(pgManager);
      // const searchResults = pgManager.getData;
      // if (searchResults && searchResults.length > 0) {
      //   setIncidents(searchResults);
      //   setPagination(pgManager); // Reset pagination for new search results
      // } else {
      //   setIncidents([]); // Reset incidents state if no search result
      //   setPagination(pgManager); // Reset pagination for new search results
      // }
  };
  
  const handleFilterChange = async (selectedFilter) => {
    console.log("Filtering with value:", selectedFilter);
    if (!selectedFilter) {
      // If the default option is selected, fetch all incidents
      await fetchIncidents();
      return;
    }
      // let response;
      // const selectedPriority = getSelectedPriority();
      // const selectedStatus = getSelectedStatus();
      // if (selectedFilter.includes("Priority:")) {
      //   const selectedPriorityValue = selectedFilter.replace("Priority:", "");
      //   response = await client.getIncidentsFilter(selectedPriorityValue, selectedStatus);
      //   setSelectedPriority(selectedPriorityValue);
      // } 
      //  if (selectedFilter.includes("Status:")) {
      //   const selectedStatusValue = selectedFilter.replace("Status:", "");
      //   response = await client.getIncidentsFilter(selectedPriority, selectedStatusValue);
      //   setSelectedStatus(selectedStatusValue);
      // }
      // console.log("Full API Response:", response);
      // const filterResults = response?.data?.pageData;
  
      // console.log("Filter response:", filterResults);
  
      // if (filterResults && filterResults.length > 0) {
      //   setIncidents(filterResults);
      //   // Reset pagination for new search results
      // } else {
      //   setIncidents([]); // Reset incidents state if no search result
      // }
  };
  useEffect(() => {
    fetchEvents();
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
        {/* <Filter className={styles.top}
  statusOptions={statusOptions}
  priorityOptions={priorityOptions}
  onStatusFilterChange={(statusValue) => handleFilterChange(`Status: ${statusValue}`)}
  onPriorityFilterChange={(priorityValue) => handleFilterChange(`Priority: ${priorityValue}`)}
  currentPage={pgManager.getCurrentPage}
/> */}

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
              <th>Event Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              {/* <th>Created At</th>
              <th>Solved At</th> */}
             <th>Price</th>
             <th>Available Tickets</th>
              <th>Atendee</th>
              <th>Image</th>
              <th>Action</th>
             
              {/* <th>Comment</th> */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(events) && events.length > 0 ? (
              events.map((event,index) => {
                const key = event.id || index;
                // const assignedTo = incident.assignedUser && incident.assignedUser.id
                //   ? `${incident.assignedUser.firstname} ${incident.assignedUser.lastname} "[${incident.assignedUser.email}]"`
                //   : 'N/A';

                return (
                  <tr key={key}>
                    <td>{event.title}</td>
                    <td>{event.description}</td>
                    <td>{event.date}</td>
                    <td>{event.time}</td>
                    <td>{event.price}</td> 
                    <td>{event.availableTickets}</td> 
                    <td>{event.attendees.length}</td> 
                
                   
                    <td>
                      <div>
                         <img
  src={event.image}  
  alt={`Image for ${event.title}`}
  style={{ maxWidth: '100px', cursor: 'pointer' }}
/>
                      </div>
                    </td>
                    <td>
                      <div className={styles.buttons}>
                        <Link href={`/dashboard/Incidents/update/${event.id}`}> 
                          <button className={`${styles.button} ${styles.view}`}>Update</button>
                        </Link> 
                        <Link href={`/dashboard/Incidents/view/${event.id}`}> 
                          <button className={`${styles.button} ${styles.view}`}>View</button>
                        </Link>
                        {/* <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(incident.id)}>Delete</button> */}
                      </div>
                    </td>
                    
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
      {/* {Array.isArray(events) && events.length > 0 ? (
              events.map((event,index) => {
                const key = event.id || index;
                return(
                <div  key={key} className={cardContainerStyles.cardsContainer}>
      <div className={cardStyles.card}>
      <h3>{event.title}</h3>
      <p>{event.date}</p>
      <p>{event.price}</p>
    </div>
    </div>);
    })):<p>No Incidents found</p>} */}
   
      {/* <div>
        <Pagination pgManager={pgManager} handlePageChange={handlePageChange} />
      </div> */}
    </div>
  );
};
export default IncidentPage;