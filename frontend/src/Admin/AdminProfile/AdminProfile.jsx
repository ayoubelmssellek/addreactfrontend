import { useState } from 'react';
import { User, Edit, Save } from "lucide-react";
import styles from './AdminProfile.module.css';

import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

export default function AdminProfile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, Anytown, USA',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile saved successfully!');
  };

  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };

  return (
    <div className={styles.content}>
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div className={`${styles.allBadges} ${isOpen ? styles.pushMainContent : styles.ml20}`}>
        <Navbar pagePath='Profile' />
        <div className={styles.pages}>
          <div className={styles.profileCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>
                <User className={styles.iconSpacing} />
                Admin Profile
              </h2>
              <p className={styles.cardDescription}>
                View and edit your profile information.
              </p>
            </div>

            <div className={styles.cardContent}>
              <div className={styles.formGrid}>
                <div className={styles.formRow}>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </div>
                
                <div className={styles.formRow}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </div>

                <div className={styles.formRow}>
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className={styles.cardFooter}>
              {isEditing ? (
                <button className={`${styles.button} ${styles.saveButton}`} onClick={handleSave}>
                  <Save className={styles.buttonIcon} />
                  Save
                </button>
              ) : (
                <button className={`${styles.button} ${styles.editButton}`} onClick={() => setIsEditing(true)}>
                  <Edit className={styles.buttonIcon} />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}