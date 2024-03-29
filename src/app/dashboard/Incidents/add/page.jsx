"use client"
import React, { useEffect, useState } from 'react';
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import ProtectedRoute from "@/app/lib/protecteRoute";
import UserServices from "@/services/user_service";
import PaginationManager from '@/app/lib/pagination_manager';
import EventServices from '@/services/event_service';
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { ref, uploadBytes, getDownloadURL, getStorage} from 'firebase/storage';
import { getAuth} from 'firebase/auth';
import { signInAnonymously as signInAnonymouslyFirebase } from 'firebase/auth'; 




const AddIncidentPage = () => {
  const storage = getStorage(); 

  const router = useRouter();
  const userClients = UserServices;
  const eventClient = EventServices;
  const [pgManager, setPagination] = useState(new PaginationManager());
  const [users, setUsers] = useState([]);
  const eventOrganizerId= localStorage.getItem('userId');
  console.log("eventOrganizrId",eventOrganizerId);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'upcoming',
    date: '',
    time: '',
    price: '',
    availableTickets: '',
    eventOrganizer: eventOrganizerId,
    attendee:[],
    image: null,

  });
  
  const [imageUrl, setImageUrl] = useState();
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
      [name]: name === 'date' || name === 'time' ? value : String(value),
    });
  };
  const handleUploadImage = async () => {

    try {
      const userId = await signInAnonymously();
      const uploadedImageUrl = await uploadImage(imageUrl, userId);
      setImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle upload errors (e.g., display error message)
    }
  }
  
  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    const userId = await signInAnonymously();
    const uploadedImageUrl = await uploadImage(selectedImage, userId);
    setImageUrl(uploadedImageUrl);

  };
  const [minDate, setMinDate] = useState(getCurrentDate());

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // Pad month and day with leading zero if needed
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = async (e) => {
     e.preventDefault();
    await handleUploadImage();
    // Update the formData object with the image URL
    formData.image = imageUrl;
    console.log(imageUrl)
 
    const response = await eventClient.addEvent(formData);
    console.log("Here is response,", response)
    if (response) {
      toast.success('event added successfully', { position: 'top-right' });
      setTimeout(() => {
        router.push('/dashboard/Incidents');
      }, 1000);

    }
    else {
      toast.error('Unable to add Incident', { position: 'top-right' });
    }
  };
  return (
    <ProtectedRoute allowedRoles={['EVENT_ORGANIZER']}>
      <div className={styles.container}>
        <ToastContainer />
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            name="title"
            required
            onChange={handleChange}
          />

          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          <input
      type="date"
      placeholder="date"
      name="date"
      required
      onChange={handleChange}
      min={minDate}
    />

          <input
            type="time"
            placeholder="time"
            name="time"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="price"
            name="price"
            required
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="availableTickets"
            name="availableTickets"
            required
            onChange={handleChange}
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

  async function uploadImage(image, userId) {
    try {
      const filename = `${Date.now()}.jpg`; // Use current timestamp for unique filenames
      const imageRef = ref(storage, `event_images/${filename}`);
  
      const metadata = {
        customMetadata: { userId }, // Include user ID as metadata
      };
  
      const uploadTask = uploadBytes(imageRef, image, metadata);
    // const url=  uploadTask.then((snapshot) => {
    //     console.log('Image uploaded successfully!',snapshot.ref);
    //     const downloadUrl = snapshot.ref.getDownloadURL();
    //     resolve(downloadUrl);
    //   })
      const snapshot = await uploadTask; // Wait for upload completion
console.log("snapshot",snapshot);
      // Ensure compatibility with older Firebase versions:
      const downloadUrl = await getDownloadURL(snapshot.ref);
      console.log(downloadUrl)
      return downloadUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      // Handle errors appropriately, e.g., return a default URL or throw an error
      return null; // Or throw an error for further handling
    }
  }
  
async function signInAnonymously() {
  try {
    const auth = getAuth();
    const credential = await signInAnonymouslyFirebase(auth);

    if (credential.user) {
      console.log('Signed in anonymously as:', credential.user.uid); // Use user.uid for user ID
      return credential.user.uid; // Return the user ID for further use
    } else {
      console.error('Anonymous sign-in failed.');
      return null;
    }
  } catch (error) {
    console.error('Error signing in anonymously:', error);
    return null;
  }
}


};

export default AddIncidentPage;