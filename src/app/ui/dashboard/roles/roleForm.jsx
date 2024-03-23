import React from 'react';
import styles from "@/app/ui/dashboard/roles/roles.module.css";


const RoleForm = ({ onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming 'name' is the input field's name
    const roleName = e.target.name.value;
    // Assuming 'permissions' is the array of selected permissions
    const permissions = Array.from(e.target.elements.permissions)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.value);

    // Call the onSubmit function with the role data
    onSubmit({ roleName, permissions });
  };

  return (
   <div className={styles.container}>
      <form className={styles.form}>
        <table>
        <thead>
          <tr>
            <td>
            <label >Role Name</label>
            </td>
            <td>
            <input type="text" id="name" name="name" required />     
            </td>
          </tr>
        </thead>
      
        <tbody>
            <tr>
              <td>
              <label >Access</label>
              </td>
              <td>
              <select
        id="category"
        name="category"
        // value={selectedCategory}
        // onChange={(e) => setSelectedCategory(e.target.value)}
      >
        
        <option value="user">User</option>
        <option value="incident">Incident</option>
        {/* Add more categories as needed */}
      </select>
              </td>
              <td><fieldset>
        <legend>Permissions:</legend>
       <div className="new-line">
        <input type="checkbox" id="read" name="permissions" value="read" />
        <label htmlFor="read">create</label>
        </div>
        <div className="new-line">
        <input type="checkbox" id="write" name="permissions" value="write" />
        <label  htmlFor="write">update</label>
        </div>

        <div className="new-line">
        <input type="checkbox" id="delete" name="permissions" value="delete" />
        <label htmlFor="delete">Delete</label>
        </div>
        {/* Add more permission checkboxes as needed */}
      </fieldset></td>
              
            </tr>
            </tbody>
     
      

      
      </table>
      <button type="submit">Submit</button>

    </form>
    </div>
  
  );
};

export default RoleForm;
