import Image from "next/image";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { useEffect, useState } from "react";

import {
  MdDashboard,
  MdSupervisedUserCircle,
  MdShoppingBag,
  MdAttachMoney,
  MdWork,
  MdAnalytics,
  MdPeople,
  MdOutlineSettings,
  MdHelpCenter,
  MdLogout,
} from "react-icons/md";
//import { auth, signOut } from "@/app/auth";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: "/dashboard",
        icon: <MdDashboard />,
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },  
       {
        title: "Event Organizers",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: "Events",
        path: "/dashboard/Incidents",
        icon: <MdDashboard />,
      },
      {
        title: "Report",
        path: "/dashboard/ussd_report",
        icon: <MdShoppingBag />,
      },

    ],
  },
  
  {
    title: "Settings",
    list: [
      {
        title: "Change Password",
        path: "/dashboard/changepassword",
        icon: <MdOutlineSettings />,
        dropdown: [
          {
            title: "Change Password",
            path: "/dashboard/settings/change-password",
          },
        ],
      },

    ],
  },
];

 const Sidebar = ()=> {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

 // const { user } =  auth();
  return (
    
    <div className={styles.container}>
      <div className={styles.user}>
        {/* <Image
          className={styles.userImage}
          src={user.img || "/noavatar.png"}
          alt=""
          width="50"
          height="50"
        /> */}
        <div className={styles.logoContainer}>
        <img src="/eventlogo.png" alt="Company Logo" className={styles.logo} />
      </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <form
        // action={ () => {
        //   "use server";
        //  // await signOut();
        // }}
      >
        <button className={styles.logout}>
          <MdLogout />
          Logout
        </button>
      </form>
    </div>
  );
};

export default Sidebar;
