import ApiClient from "@/app/lib/HttpRequestManager/api_client";



export default class UserServices {

    static async login(credential) {

        const client = ApiClient.getInstance();
        //console.log("this is path:",client);
        try{
            const authenticated = await client.post('/user/login', credential);
        console.log('Logged in successfully', authenticated);

        return authenticated; 
        }
        catch (error) {
            return error;
        }

    }
    static async getUsers(page, size) {
        //const client = ApiClient.getInstance();
        try{
            const paginatedData = await ApiClient.getInstance().getPaginated('/users/getusers', {}, page, size);
        return paginatedData;
        }
        catch (error) {
            return error;
        }
        
    }
    static async getAllUsers() {
        const client = ApiClient.getInstance();
        try{
            const usersData = await client.get('/user/AllUsers');
        return usersData;
        }
        catch (error) {
            return error;
        }
    }
    static async getEventOrganizers() {
        const client = ApiClient.getInstance();
        try{
            const eventOrganizers = await client.get('/user/eventOrganizers');
        return eventOrganizers;
        }
        catch (error) {
            return error;
        }
    }

    // static async getUsersSearch(firstname, page, size) {
    //     const queryParam = `Firstname=${firstname}`
    //     try {
    //       const search = await ApiClient.getInstance().getPaginated(`/users/getusers?${queryParam}`,{},page,size);
    //       return search;       
    //     } catch (error) {
    //       return error;
    //     }
    //   }
      
    static async getUsersSearch(firstname, page, size) {
        const queryParams = `firstname=${firstname}`;
      
        try {
          const search = await ApiClient.getInstance().getPaginated(`/users/getusers?${queryParams}`,{},page,size);
          return search;       
        } catch (error) {
          return error;
        }
      }
      
      static async changePassword(credentials) {
        const client = ApiClient.getInstance();
    
        try {
          const response = await client.post('/user/change-password', credentials,{});
          return response.data; // You might want to return some meaningful data from the backend
        } catch (error) {
          throw new Error('Error changing password: ' + error.message);
        }
      }

    static async addUser(user) {

        const client = ApiClient.getInstance();
        try{
              const response = await client.post('/user/register', user);
        //console.log('user added successfully', response);

        return response;
        }
        catch (error) {
            return error;
        }   

    }

    static async getUserById(id) {
        const client = ApiClient.getInstance();
        try{
           const response = await client.get(`/users/${id}`);
        return response; 
        }
        catch (error) {
            return error;
        }

    }
    static async updateUser(userId, formdata) {
        const client = ApiClient.getInstance();
        try{
            const response = await client.put(`/users/update/${userId}`, formdata);
        console.log('user updated successfully', response);
     
        return response;
        }
        catch (error) {
            return error;
        }
    }
    static async forgotPassword(email) {
        const client = ApiClient.getInstance();
        try{
            const response = await client.post('/forgot-password', email,{});
        console.log('otp sent successfully', response);
       
        return response;

        }
        catch (error) {
            return error;
        }
    }

    static async setPassword(data) {
        const client = ApiClient.getInstance();
        try{
            const response = await client.post('/reset-password', data,{});
        console.log('otp sent successfully', response);
        return response;
        }
        catch (error) {
            return error;
        }
    }

    static async refreshAccessToken(refreshToken) {
        const client = ApiClient.getInstance();
        try {
          const response = await client.post('/auth/refresh-token',refreshToken);
          
          const newAccessToken = response.data.access_token;
      
          // Store the new access token (replace this with your token storage logic)
          localStorage.setItem('token', newAccessToken);
      
          return newAccessToken;
        } catch (error) {
          console.error('Error refreshing access token:', error);
          throw error; // Handle the error appropriately
        }
      }
    
    
}