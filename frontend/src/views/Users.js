import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Users.css"; // Import CSS file for styling

function Users() {
  const [data, setData] = useState({ users: [], phones: [] });

  useEffect(() => {
    axios
      .get("/api/data")
      .then((response) => {
        setData(response.data);
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
                  {data.phones.map((phone) => (
                    <option key={phone.id} value={phone.id}>
                      {phone.number}
                    </option>
                  ))}
                </select>
              </td>
              <td>{user.creationDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
