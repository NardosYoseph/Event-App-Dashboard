"use client"
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useEffect,useState} from "react";
import ApiClient from '@/app/lib/HttpRequestManager/api_client';
import UserServices from '@/services/user_service';
import PaginationManager from '@/app/lib/pagination_manager'; 
import Search from "@/app/ui/dashboard/search/search";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import ProtectedRoute from "@/app/lib/protecteRoute";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setsearchResults] = useState([""]);
 
  const router = useRouter();
  const client = UserServices;
  const [pgManager, setPagination] = useState(new PaginationManager());

  // const fetchUsers = async (pageNumber) => {
  //   const paginatedData = await client.getUsers(pageNumber ?? pgManager.getCurrentPage,pgManager.getTotalItems);
  //   pgManager.setData(paginatedData?.data);
  //   setPagination(pgManager);
  //   const users = pgManager.getData;
  //   setUsers(users);
  // };
  const fetchUsers = async () => {
    const userData = await client.getAllUsers();
    const users = userData.userList;
    setUsers(users);
  };
  const handleSearch = async (Firstname, pageNumber) => {
    if (!Firstname) {
      await fetchUsers();
      return;
    }
  
    const searchResult = await client.getUsersSearch(
      Firstname,
      pageNumber ?? pgManager.getCurrentPage,
      pgManager.getTotalItems
    );
    
    const newPgManager = new PaginationManager();
    newPgManager.setData(searchResult?.data);
    setPagination(newPgManager);
    const searchResults = newPgManager.getData; 
  
    if (searchResults && searchResults.length > 0) {
      setUsers(searchResults);
    } else {
      setUsers([]);
    }
  };
    
  useEffect(() => {
    fetchUsers();
  }, []);
  const handlePageChange = async (pageNumber) => {
     
      await fetchUsers(pageNumber); 
  };
  
  return (
    <ProtectedRoute allowedRoles={['ADMIN']}>
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." onSearch={handleSearch} />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <td>Username</td>
            <td>Email</td>
            <td>Role</td>
            <td>Events</td>

          </tr>
        </thead>
        <tbody>
  {Array.isArray(users) && users.length > 0 ? (
    users.map((user) => (
      <tr key={user.id}>
        <td>
          <div className={styles.user}>{user.username}</div>
        </td>
        <td>{user.email}</td>
        <td>{user.role}</td>
        <td>{user.events.length}</td>
        {/* <td>
          <div className={styles.buttons}>
            <Link href={`/dashboard/users/update/${user.id}`}>
              <button className={`${styles.button} ${styles.view}`}>
                Update
              </button>
            </Link>
            <button
              className={`${styles.button} ${styles.delete}`}
              // onClick={() => handleDelete(user.id)}
            >
              Delete
            </button>
          </div>
        </td> */}
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5">No users found</td>
    </tr>
  )}
</tbody>

      </table>

      <div>
        <Pagination pgManager={pgManager} handlePageChange={handlePageChange} />
      </div>
    </div>
      </ProtectedRoute>
      );
};

export default UsersPage;
