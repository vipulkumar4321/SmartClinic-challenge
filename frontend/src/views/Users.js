import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css"; // Import CSS file for styling

function Users() {
  const [data, setData] = useState({ users: [] });

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3001/user")
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phones</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          {data.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <select>
                  {user.phones.map((phone, index) => (
                    <option key={index} value={phone}>
                      {phone}
                    </option>
                  ))}
                </select>
              </td>
              <td>{user.creation_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
