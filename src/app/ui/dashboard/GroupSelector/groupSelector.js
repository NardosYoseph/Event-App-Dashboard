// components/GroupSelector.js
import styles from "@/app/ui/dashboard/users/users.module.css";


import { useState } from 'react';

const GroupSelector = ({ groups, onSelect }) => {
  const [selectedGroups, setSelectedGroups] = useState([]);

  const handleCheckboxChange = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter((g) => g !== group));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  const handleSelect = () => {
    onSelect(selectedGroups);
  };

  return (
    <div className={styles.container} >
      <h2>Select Groups:</h2>
      {groups.map((group) => (
        <div key={group}>
          <label>
            <input
              type="checkbox"
              value={group}
              checked={selectedGroups.includes(group)}
              onChange={() => handleCheckboxChange(group)}
            />
            {group}
          </label>
        </div>
      ))}
      <button onClick={handleSelect}>Select</button>
    </div>
  );
};

export default GroupSelector;
