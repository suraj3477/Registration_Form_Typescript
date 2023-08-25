import React, { useState } from 'react';
import './index.css';
import RegistrationForm from './components/RegistrationForm';
import UserList from './components/UserList';

interface User {
  name: string;
  email: string;
  dob: Date;
  city: string;
  pincode: string;
}

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const handleRegistration = (data:User) => {
    const user: User = {
      name: data.name,
      email: data.email,
      dob: data.dob,
      city: data.city,
      pincode: data.pincode,
    };
    setUsers([...users, user]);
  };

  return (
    <div className="app">
      <RegistrationForm onSubmit={handleRegistration} />
      <UserList users={users} />
    </div>
  );
};

export default App;
