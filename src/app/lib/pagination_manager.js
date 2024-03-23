// import PaginationModel from "./models/pagination_model";

// export default class PaginationManager {
//     constructor(data) {
      
//       this.data = data ?? new PaginationModel();
      
//       }
//      setData(paginatedData){
//         this.data.setData(paginatedData);
//         //console.log(data);
//       }

//       get getData() {
//         return this.data.data;
//       }

//       get getCurrentPage() {
//         return this.data.currentPage;
//       }

//       get getTotalPages() {
//         return this.data.totalPages;
//       }

//       get getTotalItems() {
//         return this.data.totalItems;
//       }
    
  
//     // get incidentsPerPage() {
//     //   return 5; 
//     // }
  
//     get hasPreviousPage() {
//      // console.log(data.currentPage);
//         return this.data.currentPage > 1;
        
//     }
  
//     get hasNextPage() {
//       //console.log(data.currentPage);
//       return this.currentPage < this.data.totalPages;
//     }
  
//     get pageLinks() {
//       const links = [];
//       for (let i = 1; i <= this.data.totalPages; i++) {
//         links.push({ pageNumber: i, isCurrent: i === this.data.currentPage });
//       }
//       return links;
//     }
//   }
import PaginationModel from "./models/pagination_model";

export default class PaginationManager {
  constructor(data) {
    this.data = data ?? new PaginationModel();
  }

  setData(paginatedData) {
    this.data.setData(paginatedData);
  }

  get getData() {
    return this.data.data;
  }

  get getCurrentPage() {
    return this.data.currentPage;
  }

  get getTotalPages() {
    return this.data.totalPages;
  }

  get getTotalItems() {
    return this.data.totalItems;
  }

  get hasPreviousPage() {
    return this.data.currentPage > 1;
  }

  get hasNextPage() {
    return this.data.currentPage < this.data.totalPages;
  }

  get pageLinks() {
    const links = [];
    for (let i = 1; i <= this.data.totalPages; i++) {
      links.push({ pageNumber: i, isCurrent: i === this.data.currentPage });
    }
    return links;
  }

  async fetchPage(pageNumber) {
    const response = await fetch(`/api/incidents?page=${pageNumber}`);
    const data = await response.json();

    const newPagination = new PaginationModel(
      data.totalItems,
      data.data,
      data.totalPages,
      data.currentPage
    );

    this.setData(newPagination);
  }

  async fetchNextPage() {
    const nextPage = this.data.currentPage + 1;
    await this.fetchPage(nextPage);
  }

  async fetchPrevPage() {
    const prevPage = this.data.currentPage - 1;
    await this.fetchPage(prevPage);
  }
}