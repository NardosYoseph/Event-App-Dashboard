import ApiClient from "@/app/lib/HttpRequestManager/api_client";


export default class UssdReportService {

    static async getIntegration() {
        const client = ApiClient.getInstance();
        try {
            //const paginatedData = await ApiClient.getInstance().getPaginated('auth/authenticate',{}, page, size);
            const intgerationData = await client.get("/integration/getapi",{},{});
            return intgerationData.data;
        } catch (error) {
            console.log("No data avialable", error);
        }
    }

    static async addIntegration(integration) {
  
        const client = ApiClient.getInstance();
        try {
            const response = await client.post('/integration/add', integration,{});
            console.log('integration added successfully', response);
           
            return response;
        } catch (error) {
            return error;
        }
    }

    static async sendReport(attachment,ccList) {
        console.log(attachment);
        const client = ApiClient.getInstance();
     
        client.setHeader({'Content-Type': 'multipart/form-data'});
        try {
            const response = await client.post('/USSD/send',attachment,{ccList});
            console.log('report send successfully', response);
            
            return response;
        } catch (error) {
            return error;
        }finally {
            client.setHeader({ 'Content-Type': 'application/json' });
        }
    }
    static async getGroupedEmail(role) {
        console.log(role);
        const client = ApiClient.getInstance();
        try {
            const response = await client.post("/users/groupedByRole",{},{role});
            return response.data;
        } catch (error) {
            console.log("No data avialable", error);
        }
    }

    
}