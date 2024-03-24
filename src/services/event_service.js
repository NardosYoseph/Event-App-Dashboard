import ApiClient from "@/app/lib/HttpRequestManager/api_client";

const getIncidentPath = "/incident/list";

export default class IncidentServices {

    static async getIncidents(page, size) {
        const client = ApiClient.getInstance();
        try{
          const paginatedData = await client.getPaginated(getIncidentPath, {}, page, size);
            return paginatedData;
        }
        catch (error) {
          return error;
      } 
       
    }
    static async getIncidentsSearch(Name,page,size) {
        const queryParam = `incident_name=${Name}`; // Construct the query parameter for the search value
        try{
          const search = await ApiClient.getInstance().getPaginated(`/incident/list?${queryParam}`,{},page,size);
        return search;
        }
        catch (error) {
          return error;
      }
      }
      static async getIncidentsFilter(priority,status) {
        try {
            const search = await ApiClient.getInstance().get(`/incident/search`,{priority,status});
            console.log("API Response:", search);
    
            return search;
        } catch (error) {
            console.error("Error in getIncidentsFilter:", error);
            return error;
        }
    }
    static async addEvent(formData) {
        const client = ApiClient.getInstance();
      try{
        const response = await client.post('/event/create', formData);
        
        return response;
      }
      catch (error) {
        return error;
    }
      }
      
      
    static async getIncidentById(id) {
        const client = ApiClient.getInstance();
     try{
      const response = await client.get(`/incident/${id}`);
            return response;
     }
     catch (error) {
      return error;
  }     
    }

    static async updateIncidents(id, formData) {
        const client = ApiClient.getInstance();
        // const params = {
        //   user_id: user_id,
        // };
        try{
          const response = await client.put(`/incident/update/${id}`, formData);
            return response;
        
        }
        catch (error) {
          return error;
      }
            
    }
    
    /////////////////////////////////
    static async getAnalytics() {
        const param={"timeframe":"weekly"};
        const client = ApiClient.getInstance();
        try {
            const analytics = await client.get('/incident/analytics',{},param);
            console.log(analytics);
            return analytics;
        } catch (error) {
console.log(error);
        }
        
    }
    static async escalateIncident(id) {
const data={"incidentId":id};
      const client = ApiClient.getInstance();
      try{
            const response = await client.post('/incident/escalate', data);
      //console.log('user added successfully', response);

      return response;
      }
      catch (error) {
          return error;
      }   

  }

}