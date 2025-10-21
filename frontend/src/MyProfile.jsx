import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from './AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Stethoscope,
  FileText,
  
} from 'lucide-react';
import styles from './MyProfile.module.css';

const ProfileFieldItem = React.memo(function ProfileFieldItem({
  isEditing,
  label,
  value,
  field,
  icon: Icon,
  type = 'text',
  editedData,
  onChange,
  inputRef,
  onFocus,
  onKeyDown
}) {
  return (
    <div className={styles.profileField}>
      <div className={styles.fieldHeader}>
        <Icon className={styles.fieldIcon} />
        <label className={styles.fieldLabel}>{label}</label>
      </div>
      {isEditing ? (
        <input
          type={type}
          name={field}
          autoComplete="on"
          ref={inputRef}
          value={editedData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          onFocus={() => onFocus(field)}
          onKeyDown={(e) => onKeyDown(e, field)}
          className={styles.inputField}
        />
      ) : (
        <span className={styles.fieldValue}>{value}</span>
      )}
    </div>
  );
});

const MyProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const inputRefs = useRef({});
  const [focusedField, setFocusedField] = useState(null);
  const fieldOrder = useMemo(() => [
    'firstName',
    'lastName',
    'email',
    'phone',
    'dateOfBirth',
    'address',
    'bloodType',
    'medicalHistory',
    
  ], []);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Healthcare St, Medical City, MC 12345',
    dateOfBirth: '1990-01-15',
    bloodType: 'O+',
    medicalHistory: 'No known allergies. Regular checkups.',
    insuranceProvider: 'HealthCare Plus',
    insuranceNumber: 'HCP-123456789'
  });

  const [editedData, setEditedData] = useState(profileData);

  useEffect(() => {
    if (user) {
      const updatedData = {
        ...profileData,
        firstName: user.firstName || user.fullName?.split(' ')[0] || 'John',
        lastName: user.lastName || user.fullName?.split(' ')[1] || 'Doe',
        email: user.email || 'john.doe@example.com'
      };
      setProfileData(updatedData);
      setEditedData(updatedData);
    }
  }, [user]);

  const handleEdit = () => {
    setEditedData(profileData);
    setIsEditing(true);
    setFocusedField('firstName');
  };

  const handleSave = () => {
    setProfileData(editedData);
    setIsEditing(false);
    console.log('Saving profile data:', editedData);
  };

  const handleCancel = () => {
    setEditedData(profileData);
    setIsEditing(false);
    setFocusedField(null);
  };

  const handleInputChange = (field, value) => {
    setEditedData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFocusField = (field) => {
    setFocusedField(field);
  };

  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const idx = fieldOrder.indexOf(field);
      if (idx >= 0) {
        const nextField = fieldOrder[idx + 1];
        if (nextField && inputRefs.current[nextField]) {
          inputRefs.current[nextField].focus();
        }
      }
    }
  };

  useEffect(() => {
    if (isEditing && focusedField && inputRefs.current[focusedField]) {
      // Ensure the currently intended field remains focused after re-render
      inputRefs.current[focusedField].focus();
    }
  }, [isEditing, focusedField, editedData]);

  // Removed programmatic focusing to prevent cursor jumping between fields

  const getInputRef = (field) => (el) => { inputRefs.current[field] = el; };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileContent}>
        {/* Profile Header */}
        <div className={styles.profileHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>
              <User className={styles.avatarIcon} color="#0f172a" />
            </div>
            <div className={styles.userMeta}>
              <h2 className={styles.userName}>
                {profileData.firstName} {profileData.lastName}
              </h2>
              <p className={styles.userEmail}>{profileData.email}</p>
            </div>
          </div>

          <div className={styles.actionButtons}>
            {isEditing ? (
              <>
                <button onClick={handleSave} className={styles.saveButton}>
                  <Save className={styles.buttonIcon} />
                  Save Changes
                </button>
                <button onClick={handleCancel} className={styles.cancelButton}>
                  <X className={styles.buttonIcon} />
                  Cancel
                </button>
              </>
            ) : (
              <button onClick={handleEdit} className={styles.editButton}>
                <Edit className={styles.buttonIcon} />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Profile Sections */}
        <div className={styles.profileSections}>
          {/* Personal Information */}
          <div className={styles.profileSection}>
            <h3 className={styles.sectionTitle}>
              <User className={styles.sectionIcon} />
              Personal Information
            </h3>
            <div className={styles.fieldsGrid}>
              <ProfileFieldItem
                label="First Name"
                value={profileData.firstName}
                field="firstName"
                icon={User}
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('firstName')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
              <ProfileFieldItem
                label="Last Name"
                value={profileData.lastName}
                field="lastName"
                icon={User}
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('lastName')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
              <ProfileFieldItem
                label="Email Address"
                value={profileData.email}
                field="email"
                icon={Mail}
                type="email"
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('email')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
              <ProfileFieldItem
                label="Phone Number"
                value={profileData.phone}
                field="phone"
                icon={Phone}
                type="tel"
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('phone')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
              <ProfileFieldItem
                label="Date of Birth"
                value={profileData.dateOfBirth}
                field="dateOfBirth"
                icon={Calendar}
                type="date"
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('dateOfBirth')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
              <ProfileFieldItem
                label="Address"
                value={profileData.address}
                field="address"
                icon={MapPin}
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('address')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className={styles.profileSection}>
            <h3 className={styles.sectionTitle}>
              <Stethoscope className={styles.sectionIcon} />
              Medical Information
            </h3>
            <div className={styles.fieldsGrid}>
              <ProfileFieldItem
                label="Blood Type"
                value={profileData.bloodType}
                field="bloodType"
                icon={Stethoscope}
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('bloodType')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
              <ProfileFieldItem
                label="Medical History"
                value={profileData.medicalHistory}
                field="medicalHistory"
                icon={FileText}
                isEditing={isEditing}
                editedData={editedData}
                onChange={handleInputChange}
                inputRef={getInputRef('medicalHistory')}
                onFocus={handleFocusField}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>

          {/* Insurance Information removed as per requirement */}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
