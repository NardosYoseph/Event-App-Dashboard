"use client"
//import Search from "@/app/ui/dashboard/search/search";
import axios from 'axios';
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import UserServices from "@/services/user_service";
import IntegrationServices from "@/services/ussd_report_service";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FormData from "form-data";
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';
import GroupSelector from '@/app/ui/dashboard/GroupSelector/groupSelector';

const UssdPage = () => {

    
    const [loader, setLoader] = useState();

    const [users, setUsers] = useState([]);
    const [integrations, setIntegrations] = useState([]);
    const ussdclient = IntegrationServices;
    const userclient = UserServices;
    const [formData, setFormData] = useState({
        ccList: "",
        attachment: ""
    });

    const downloadPdf = async () => {
        const capture = document.querySelector(".print");
        setLoader(true);
      
        try {
            const pdfOptions = {
                margin: 10,
                filename: 'ussdReport.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 }, // You can adjust the scale
                jsPDF: { unit: 'pt', format: 'a4', orientation: 'landscape' },
              };
          const pdfBlob = await html2pdf().from(capture).set(pdfOptions).outputPdf();
      
          const ussdData = new FormData();
          ussdData.append('attachment', new File([pdfBlob], 'ussdReport.pdf', { type: 'application/pdf' }));
          console.log(ussdData);
          setLoader(false);
          sendPdfToApi(ussdData);
        } catch (error) {
          console.error('Error generating PDF:', error);
          setLoader(false);
        }
      };
      
      

    const sendPdfToApi = async (pdfBlob) => {

        const token = localStorage.getItem('token');
        console.log(token);
            const response = await ussdclient.sendReport(pdfBlob,formData.ccList);
    }
    const fetchIntegrations = async () => {
        const integrationData = await ussdclient.getIntegration();
        const integrations = integrationData;
        setIntegrations(integrations);
    };
    useEffect(() => {
        fetchIntegrations();
    }, []);

    const handleGroupSelect = async (selectedGroup) => {
        const response = await ussdclient.getGroupedEmail(selectedGroup);
        const data = await response;

          const emails = data.map(user => user.email).join(',');
          setFormData({
            ...formData,
            ccList: emails,
          });
        }


    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div class="form-group">  
                   
    <select id="MANAGER" onChange={(e) => handleGroupSelect(e.target.value)}>
        <option value="OFFICER">Group</option>
        <option value="MANAGER">Manager</option>
    </select>               
                    <button className={styles.addButton} onClick={downloadPdf}>SendReport</button>
                </div>
                <Link href="/dashboard/ussd_report/add_integration">
                    <button className={styles.addButton}>Add New Integration</button>
                </Link>
            </div>
            <div className="print">
                <form>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>Integrations</td>
                                <td>IP</td>
                                <td>9:00</td>
                                <td>5:00</td>
                                <td>1:00</td>
                                <td>3:00</td>
                                <td>5:00</td>
                            </tr>
                        </thead>
                        <tbody>
                            {integrations && integrations.map((Integration) => (
                                <tr key={Integration.id}>
                                    <td>
                                        <div className={styles.user}>
                                            {Integration.apiIntegrationName}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.user}>
                                            {Integration.ipAddress}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.user}>
                                            <select name="status" id="status">
                                                <option value={false}>
                                                    Status
                                                </option>
                                                <option value="UP">UP</option>
                                                <option value="DOWN">DOWN</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.user}>
                                            <select name="status" id="status">
                                                <option value={false}>
                                                    Status
                                                </option>
                                                <option value="UP">UP</option>
                                                <option value="DOWN">DOWN</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.user}>
                                            <select name="status" id="status">
                                                <option value={false}>
                                                    Status
                                                </option>
                                                <option value="UP">UP</option>
                                                <option value="DOWN">DOWN</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.user}>
                                            <select name="status" id="status">
                                                <option value={false}>
                                                    Status
                                                </option>
                                                <option value="UP">UP</option>
                                                <option value="DOWN">DOWN</option>
                                            </select>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.user}>
                                            <select name="status" id="status">
                                                <option value={false}>
                                                    Status
                                                </option>
                                                <option value="UP">UP</option>
                                                <option value="DOWN">DOWN</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>))}
                        </tbody>
                    </table>
                </form>
                <div>
                    <form>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <td>USSD Transactions</td>
                                    <td>9:00</td>
                                    <td>5:00</td>
                                    <td>1:00</td>
                                    <td>3:00</td>
                                    <td>5:00</td>
                                </tr>
                            </thead>
                            <tbody>
                                <td>
                                    <div className={styles.user}>
                                        Number Of Transactions
                                    </div>
                                </td>
                                <td>
                                    <input
                                        type="UssdTransaction"
                                        name="UssdTransaction"
                                        required />
                                </td>
                                <td>
                                    <input
                                        type="UssdTransaction"
                                        name="UssdTransaction"
                                        required />
                                </td>   <td>
                                    <input
                                        type="UssdTransaction"
                                        name="UssdTransaction"
                                        required />
                                </td>
                                <td>
                                    <input
                                        type="UssdTransaction"
                                        name="UssdTransaction"
                                        required />
                                </td>   <td>
                                    <input
                                        type="UssdTransaction"
                                        name="UssdTransaction"
                                        required />
                                </td>
                            </tbody>
                        </table>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UssdPage;
