
"use client"
  import Card from "../ui/dashboard/card/card";
  import BarChart from "../ui/dashboard/charts/barchart/BarChart";
  import cardstyle from "../ui/dashboard/card/card.module.css";
  import styles from "../ui/dashboard/dashboard.module.css";
import PieChart from "../ui/dashboard/charts/piechart/PieChart";
import AnalyticsServices from "@/services/incident_service";
import {useRouter}  from "next/navigation";
import {AuthContext}  from "../lib/userAuth";
import { useEffect, useState } from "react";
import React, { useContext } from 'react';
const DashboardPage =()=>{
//   const [analytics, setAnalytics] = useState([]);
//   const client=AnalyticsServices;
//   const router= useRouter();
//   const fetchAnalytics = async () => {
//     const analyticsData = await client.getAnalytics();
//     const analytics = analyticsData;
//     setAnalytics(analytics);
// };
// useEffect(() => {
//   fetchAnalytics();
// }, []);
//   const incidentData = [
//     { day: 'Sun', solved:analytics["Sunday"]?.solved?.solved || 0, unsolved: analytics["Sunday"]?.unsolved?.unsolved},
//     { day: 'Mon', solved: analytics["Monday"]?.solved?.solved, unsolved: analytics["Monday"]?.unsolved?.unsolved },
//     { day: 'Tue', solved: analytics["Tuesday"]?.solved?.solved, unsolved: analytics["Tuesday"]?.unsolved?.unsolved },
//     { day: 'Wed', solved: analytics["Wednesday"]?.solved?.solved, unsolved: analytics["Wednesday"]?.unsolved?.unsolved },
//     { day: 'Thu', solved: analytics["Thursday"]?.solved?.solved, unsolved: analytics["Thursday"]?.unsolved?.unsolved },
//     { day: 'Fri', solved: analytics["Friday"]?.solved?.solved, unsolved: analytics["Friday"]?.unsolved?.unsolved },
//     { day: 'Sat', solved: analytics["Saturday"]?.solved?.solved, unsolved: analytics["Saturday"]?.unsolved?.unsolved },
   
//   ];
//   const totalSolved = incidentData.reduce((total, dayData) => total + dayData.solved, 0);
//   const totalUnsolved = incidentData.reduce((total, dayData) => total + dayData.unsolved, 0);
//   const totalIssues = totalSolved + totalUnsolved;
//   const percentageSolved = (totalSolved / totalIssues) * 100 || 0;
// const percentageUnsolved = (totalUnsolved / totalIssues) * 100 || 0;

//   const { isAuthenticated } = useContext(AuthContext);
//   if(!isAuthenticated){
//     router.push("/login");
//   }
  
    return (
    //   <div className={styles.wrapper}>
    //     <div className={styles.main}>
    //     <div className={styles.cardsContainer}>
    //       <Card title="Solved Issues" value={totalSolved} percentage={percentageSolved} />
    //       <Card title="Unsolved Issues" value={totalUnsolved} percentage={percentageUnsolved} />
    //     </div>
    //     <div  className={styles.chartsContainer}>
    //       <div >
    //       <BarChart incidentData={incidentData} />
    //       </div>
    //       <PieChart incidentData={incidentData} />
    //       </div>
    //     </div>
        
    //     <div className={styles.side}>

    //     </div>
    //   </div>
    <p>dashboard</p>
    );
  };
  
  export default DashboardPage;
  