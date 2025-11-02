import React, { useState, useEffect, useMemo, useRef, useContext } from 'react';
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
import axios from 'axios';
import { AppContent } from './content/AppContent';
import { toast } from 'react-toastify';

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
  const emptyProfileTemplate = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    bloodType: '',
    medicalHistory: '',
    insuranceProvider: '',
    insuranceNumber: ''
  };

  // Helper to parse a full name into first and last parts.
  const parseFullName = (fullName) => {
    if (!fullName) return { firstName: '', lastName: '' };
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return { firstName: parts[0], lastName: '' };
    return { firstName: parts[0], lastName: parts.slice(1).join(' ') };
  };

  const [profileData, setProfileData] = useState(emptyProfileTemplate);

  const [editedData, setEditedData] = useState(() => ({ ...emptyProfileTemplate }));

  const { backendUrl } = useContext(AppContent);

  useEffect(() => {
    if (user) {
      // Merge only available user fields into the profile template.
      const updatedData = {
        ...emptyProfileTemplate,
        ...profileData,
        ...(user.firstName ? { firstName: user.firstName } : {}),
        ...(user.lastName ? { lastName: user.lastName } : {}),
        ...(user.email ? { email: user.email } : {}),
      };

      // If user has a `fullName` (or `name`/`displayName`) but not explicit first/last, attempt to split it.
      const candidateFullName = user.fullName || user.name || user.displayName || '';
      if ((!updatedData.firstName || !updatedData.lastName) && candidateFullName) {
        const parsed = parseFullName(candidateFullName);
        if (!updatedData.firstName && parsed.firstName) updatedData.firstName = parsed.firstName;
        if (!updatedData.lastName && parsed.lastName) updatedData.lastName = parsed.lastName;
      }

      setProfileData(updatedData);
      setEditedData({ ...updatedData });
    }
  }, [user]);

  // Load profile from backend if available
  useEffect(() => {
    let mounted = true;
    const loadProfile = async () => {
      if (!user?.email) return;
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(`${backendUrl}/api/auth/profile`, {
          params: { email: user.email }
        });
        if (!mounted) return;
        if (data?.success && data.data) {
          const p = data.data;
          const mapped = {
            firstName: p.firstName || p.fullName?.split?.(' ')?.[0] || '',
            lastName: p.lastName || '',
            email: p.email || user.email,
            phone: p.phone || '',
            address: p.address || '',
            dateOfBirth: p.dateOfBirth || '',
            bloodType: p.bloodType || '',
            medicalHistory: p.medicalHistory || '',
          };
          setProfileData(prev => ({ ...prev, ...mapped }));
          setEditedData(prev => ({ ...prev, ...mapped }));
        }
      } catch (err) {
        // If server returns 404 treat it as "no profile created yet" and continue silently
        const status = err?.response?.status;
        if (status === 404) {
          // no profile yet for this user
          console.debug('No saved profile found for', user?.email);
        } else {
          console.error('Failed to load profile', err);
        }
      }
    };
    loadProfile();
    return () => { mounted = false; };
  }, [user?.email, backendUrl]);

  const handleEdit = () => {
    setEditedData(profileData);
    setIsEditing(true);
    setFocusedField('firstName');
  };

  const handleSave = () => {
    // Save to backend and update UI
    const payload = {
      email: editedData.email || user?.email,
      firstName: editedData.firstName,
      lastName: editedData.lastName,
      fullName: `${editedData.firstName || ''}${editedData.lastName ? ' ' + editedData.lastName : ''}`.trim(),
      phone: editedData.phone,
      address: editedData.address,
      dateOfBirth: editedData.dateOfBirth,
      bloodType: editedData.bloodType,
      medicalHistory: editedData.medicalHistory
    };
    (async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.post(`${backendUrl}/api/auth/profile`, payload);
        if (data?.success) {
          setProfileData(editedData);
          setIsEditing(false);
          toast.success(data.message || 'Profile saved');
        } else {
          toast.error(data?.message || 'Failed to save profile');
        }
      } catch (err) {
        console.error('Save profile error', err);
        toast.error(err.response?.data?.message || err.message || 'Server error');
      }
    })();
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
                {profileData.firstName}{profileData.lastName ? ` ${profileData.lastName}` : ''}
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
