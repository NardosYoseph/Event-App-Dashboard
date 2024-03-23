class User {
  constructor(firstname,lastname, email, password,role,managerId) {
    
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.role = role;
    this.managerId=managerId;
  }
}

export default User;
