export default class PaginationModel {
    constructor(totalItems,data, totalPages, currentPage) {
        this.totalItems = data?.totalItems || 4;
        this.data = data?.data || [];
        this.currentPage = data?.currentPage|| 1 ;
        this.totalPages = data?.totalPages ; 
    }

    setData(pgData) {
        if (pgData !== null && typeof pgData === 'object' && 'totalItems' in pgData) {
          this.totalItems = pgData.totalItems;
          this.data = pgData.pageData;
          this.currentPage = pgData.currentPage;
          this.totalPages = pgData.totalPages;
        } else {
          // Handle the case when pgData is null or doesn't contain the expected properties
          console.error('Invalid or missing pgData:', pgData);
          // Optionally set default values or handle the error condition appropriately
        }
      }
      
  }