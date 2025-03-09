import '../Customers/Customers.css'
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';


  
const data = [
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png',
    name: 'Robert Wolfkisser',
    job: 'Engineer',
    email: 'rob_wolf@gmail.com',
    role: 'Collaborator',
    lastActive: '2 days ago',
    active: true,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-6.png',
    name: 'Jill Jailbreaker',
    job: 'Engineer',
    email: 'jj@breaker.com',
    role: 'Collaborator',
    lastActive: '6 days ago',
    active: true,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
    name: 'Henry Silkeater',
    job: 'Designer',
    email: 'henry@silkeater.io',
    role: 'Contractor',
    lastActive: '2 days ago',
    active: false,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
    name: 'Bill Horsefighter',
    job: 'Designer',
    email: 'bhorsefighter@gmail.com',
    role: 'Contractor',
    lastActive: '5 days ago',
    active: true,
  },
  {
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
    name: 'Jeremy Footviewer',
    job: 'Manager',
    email: 'jeremy@foot.dev',
    role: 'Manager',
    lastActive: '3 days ago',
    active: false,
  },
];  
const Customers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const handleSidebarStateChange = (newState) => {
      setIsOpen(newState);
     };
  
    const [users, setUsers] = useState(data);
  
    const handleRoleChange = (index, newRole) => {
      const updatedUsers = [...users];
      updatedUsers[index].role = newRole;
      setUsers(updatedUsers);
    };
  
    return (
          <div className="content">
            <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
            <div className={`all-badges ${isOpen ? 'push-main-content' : 'ml-20'}`}>
              <Navbar pagePath="Customers" />
              <div className="pages">
              <div className="table-container">
                  <table className="users-table">
                    <thead>
                      <tr className="table-header">
                        <th>Customers</th>
                        <th>Number Phone</th>
                        <th>Last active</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item, index) => (
                        <tr key={item.name} className="table-row">
                          <td>
                            <div className="employee-group">
                              <img src={item.avatar} alt={item.name} className="employee-avatar" />
                              <div className="employee-details">
                                <p className="employee-name">{item.name}</p>
                                <p className="employee-email">{item.email}</p>
                              </div>
                            </div>
                          </td>
                          <td>
                            0640606282
                          </td>
                          <td className="last-active">{item.lastActive}</td>
                          <td>
                            <span className={`status-badge ${item.active ? 'active' : 'disabled'}`}>
                              {item.active ? 'Active' : 'Disabled'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
              </div>
          </div>
          </div>

    );
  
};

export default Customers;
