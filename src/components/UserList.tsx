import React, { useState } from 'react';

interface User {
    name: string;
    email: string;
    dob: Date;  
    city: string;
    pincode: string;
  }
  

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="user-list">
      <h2>User List</h2>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>City</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob.toString()}</td>
              <td>{user.city}</td>
              <td>{user.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
