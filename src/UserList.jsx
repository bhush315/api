import { useState, useEffect } from "react";
import axios from "axios";

const UserList = () => {
  // State to store the list of users
  const [listOfUsers, setListOfUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users using useEffect hook
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setListOfUsers(response.data); // Save the data to state
        setLoading(false); // Stop loading
      })
      .catch((err) => {
        setError("Something went wrong while fetching data!");
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs once after the component mounts

  // Show loading state or error message if needed
  if (loading) {
    return <p>Loading users...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-list">
      <h2>User List</h2>
      <ul>
        {listOfUsers.map((user) => (
          <li key={user.id} className="user-item">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>
              {user.address.city}, {user.address.zipcode}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
