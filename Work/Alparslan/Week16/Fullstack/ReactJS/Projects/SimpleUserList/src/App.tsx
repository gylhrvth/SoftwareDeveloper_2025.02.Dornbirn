
// Import hooks and types
import { useState, useEffect } from 'react'
import './App.css'

type User = {
  id: number;
  name: string;
  email: string;
}

export default function App() {
  // State to hold the list of users: It does not have an initial value, so it starts as an empty array.
  const [users, setUsers] = useState<User[]>([]);
  // State for the selected user: It starts as null, meaning no user is selected initially.
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  //Fetch users from the local JSON from the public folder
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/users.json');
      const data = await response.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);
  return (
    <div>
      <h1>Simple User List</h1>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            //user.id stay unique for each user. setSelectedUser adopts the value of the user clicked.
            // When a user is clicked, it checks if the clicked user is already selected.
            // If it is, it sets selectedUser to null (deselecting it). If not, it sets selectedUser to the clicked user.
            onClick={() => selectedUser?.id === user.id
              ? setSelectedUser(null)
              : setSelectedUser(user)
            }
            style={{
              cursor: 'pointer',
              color: selectedUser?.id === user.id ? 'gold' : 'white',
            }}
            >
            {user.name}
            </li>
        ))}
      </ul>
      {selectedUser && (
        <div className = "user-details">
          <h2>User Details</h2>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
        </div>
      )}
    </div>
  );

}


