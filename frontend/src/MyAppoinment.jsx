import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { AppContent } from './content/AppContent';
import doctorDetails from './DoctorDetail';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Stethoscope,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  XCircle,
  Download,
  Filter,
  Search
} from 'lucide-react';
import { toast } from 'react-toastify';
import styles from './MyAppoinment.module.css';
import { useNavigate } from 'react-router-dom';

const MyAppoinment = () => {
  const { user } = useAuth();
  const { backendUrl } = React.useContext(AppContent);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Load appointments for this user
  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      setLoading(true);
      try {
        const email = user?.email;
        const { data } = await axios.get(backendUrl + '/api/auth/bookings', {
          withCredentials: true,
          params: { userEmail: email }
        });
        if (!isMounted) return;
        if (data?.success) {
          const mapped = (data.data || []).map((b, idx) => {
            // try to enrich booking with doctor info from local data
            const doc = doctorDetails.find(d => String(d.id) === String(b.doctorId) || d.name === b.doctorName);
            return {
              id: b._id || idx,
              appointmentNumber: b._id?.slice(-6)?.toUpperCase() || `APT-${String(idx + 1).padStart(3, '0')}`,
              doctorId: b.doctorId || doc?.id || null,
              doctorName: b.doctorName,
              doctorSpecialty: doc?.specialty || '',
              doctorImage: doc?.photo || '',
              date: b.date,
              time: b.time,
              status: 'confirmed',
              // Only include location/duration/price if present in doctor data or booking
              location: doc?.clinic || b.location || '',
              notes: b.notes || '',
              duration: doc?.duration || b.duration || ''
            };
          });
          setAppointments(mapped);
          setFilteredAppointments(mapped);
        } else {
          setAppointments([]);
          setFilteredAppointments([]);
        }
      } catch (e) {
        setAppointments([]);
        setFilteredAppointments([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [user, backendUrl]);

  // Filter appointments based on search and status
  useEffect(() => {
    let filtered = appointments;

    if (searchTerm) {
      filtered = filtered.filter(appointment =>
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorSpecialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.appointmentNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === statusFilter);
    }

    setFilteredAppointments(filtered);
  }, [appointments, searchTerm, statusFilter]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'completed': return '#6b7280';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className={styles.statusIcon} />;
      case 'pending': return <AlertCircle className={styles.statusIcon} />;
      case 'completed': return <CheckCircle className={styles.statusIcon} />;
      case 'cancelled': return <XCircle className={styles.statusIcon} />;
      default: return <AlertCircle className={styles.statusIcon} />;
    }
  };

  const getStatusText = (status) => status.charAt(0).toUpperCase() + status.slice(1);

  const handleReschedule = (appointmentId) => {
    // Find the appointment object to get doctorId, date and time
    const appt = appointments.find(a => String(a.id) === String(appointmentId)) || filteredAppointments.find(a => String(a.id) === String(appointmentId));
    if (!appt) {
      // fallback: just log and navigate to doctors listing
      console.warn('Appointment not found for reschedule:', appointmentId);
      navigate('/doctors');
      return;
    }

    const doctorId = appt.doctorId;
    if (!doctorId) {
      // If we don't have an id, navigate to doctors list for user to choose
      window.alert('Doctor information not available for this appointment. Please choose a doctor to reschedule.');
      navigate('/doctors');
      return;
    }

    // Navigate to the doctor's details page (time/date selection) with optional query params
    const dateParam = appt.date ? `date=${encodeURIComponent(appt.date)}` : '';
    const timeParam = appt.time ? `time=${encodeURIComponent(appt.time)}` : '';
    // include appointment id so BookAppointment can update instead of creating a new booking
    const rescheduleParam = `rescheduleId=${encodeURIComponent(appointmentId)}`;
    const q = [dateParam, timeParam, rescheduleParam].filter(Boolean).join('&');
    navigate(`/doctorDetails/${doctorId}${q ? `?${q}` : ''}`);
  };

  // Start inline delete confirmation for an appointment (no browser confirm/alert)
  const confirmDelete = async (appointmentId) => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.delete(`${backendUrl}/api/auth/booking/${appointmentId}`);
        if (data?.success) {
          // remove from local state
          setAppointments(prev => prev.filter(a => String(a.id) !== String(appointmentId)));
          setFilteredAppointments(prev => prev.filter(a => String(a.id) !== String(appointmentId)));
          setStatusMessage(data.message || 'Appointment cancelled.');
        } else {
          setStatusMessage(data?.message || 'Unable to cancel appointment.');
        }
      } catch (err) {
        console.error(err);
        const status = err.response?.status;
        if (status === 404) {
          // booking already deleted on server — remove from UI and inform user
          setAppointments(prev => prev.filter(a => String(a.id) !== String(appointmentId)));
          setFilteredAppointments(prev => prev.filter(a => String(a.id) !== String(appointmentId)));
          setStatusMessage('Appointment already removed.');
        } else {
          setStatusMessage(err.response?.data?.message || err.message || 'Server error while cancelling appointment.');
        }
      } finally {
        // clear pending delete state and auto-clear status message after a short time
    setPendingDeleteId(null);
        setTimeout(() => setStatusMessage(''), 3500);
      }
  };

  const handleDownload = (appointmentId) => {
    console.log('Downloading appointment details:', appointmentId);
  };

  const AppointmentCard = ({ appointment }) => (
    <div className={styles.appointmentCard}>
      <div className={styles.appointmentHeader}>
        <div className={styles.doctorInfo}>
          <div className={styles.doctorAvatar}>
            <User className={styles.doctorIcon} color="#ffffff" strokeWidth={2.25} />
          </div>
          <div className={styles.doctorDetails}>
            <h3 className={styles.doctorName}>{appointment.doctorName}</h3>
            <p className={styles.doctorSpecialty}>{appointment.doctorSpecialty}</p>
            <span className={styles.appointmentNumber}>{appointment.appointmentNumber}</span>
          </div>
        </div>
        <div 
          className={styles.statusBadge}
          style={{ backgroundColor: getStatusColor(appointment.status) }}
        >
          {getStatusIcon(appointment.status)}
          {getStatusText(appointment.status)}
        </div>
      </div>

        <div className={styles.appointmentDetails}>
        <div className={styles.detailItem}>
          <Calendar className={styles.detailIcon} />
          <span className={styles.detailText}>{appointment.date}</span>
        </div>
        <div className={styles.detailItem}>
          <Clock className={styles.detailIcon} />
          <span className={styles.detailText}>{appointment.time}</span>
        </div>
        {appointment.location && (
          <div className={styles.detailItem}>
            <MapPin className={styles.detailIcon} />
            <span className={styles.detailText}>{appointment.location}</span>
          </div>
        )}
        {appointment.duration && (
          <div className={styles.detailItem}>
            <Stethoscope className={styles.detailIcon} />
            <span className={styles.detailText}>{appointment.duration}</span>
          </div>
        )}
      </div>

      {appointment.notes && (
        <div className={styles.notes}>
          <p className={styles.notesText}>{appointment.notes}</p>
        </div>
      )}

        <div className={styles.appointmentFooter}>
        
        <div className={styles.appointmentActions}>
          {appointment.status === 'completed' && (
            <button 
              className={styles.actionButton}
              onClick={() => handleDownload(appointment.id)}
            >
              <Download className={styles.actionIcon} />
              Download
            </button>
          )}
          {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            <button 
              className={styles.actionButton}
              onClick={() => handleReschedule(appointment.id)}
            >
              <Edit className={styles.actionIcon} />
              Reschedule
            </button>
          )}
          {appointment.status !== 'cancelled' && appointment.status !== 'completed' && (
            pendingDeleteId === appointment.id ? (
              <div className={styles.deleteConfirmRow}>
                <span className={styles.deleteConfirmText}>Confirm delete?</span>
                <button className={styles.actionButton} onClick={() => confirmDelete(appointment.id)}>Yes, delete</button>
                <button className={styles.actionButton} onClick={() => setPendingDeleteId(null)}>No, keep</button>
              </div>
            ) : (
              <button 
                className={styles.actionButton}
                onClick={() => setPendingDeleteId(appointment.id)}
              >
                <Trash2 className={styles.actionIcon} />
                Cancel
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.appointmentsContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Appointments</h1>
        <p className={styles.subtitle}>Manage your medical appointments and booking history</p>
      </div>

      <div className={styles.appointmentsContent}>
        {statusMessage && (
          <div className={styles.statusMessage} role="status">{statusMessage}</div>
        )}
        {/* Filters and Search */}
        <div className={styles.filtersSection}>
          <div className={styles.searchContainer}>
            <div className={styles.searchWrapper}>
              <Search className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by doctor name, specialty, or appointment number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
          </div>

          <div className={styles.filtersRow}>
            <div className={styles.statusFilter}>
              <Filter className={styles.filterIcon} />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Appointments</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <button className={styles.newAppointmentButton} onClick={() => navigate('/doctors')}>
              <Plus className={styles.buttonIcon} />
              Book New Appointment
            </button>
          </div>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p className={styles.loadingText}>Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className={styles.emptyState}>
            <Calendar className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>
              {searchTerm || statusFilter !== 'all' 
                ? 'No matching appointments found' 
                : 'No appointments yet'
              }
            </h3>
            <p className={styles.emptyText}>
              {searchTerm || statusFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Book your first appointment to get started with your healthcare journey.'
              }
            </p>
            {(!searchTerm && statusFilter === 'all') && (
              <button className={styles.newAppointmentButton} onClick={() => navigate('/doctors')}>
                <Plus className={styles.buttonIcon} />
                Book Your First Appointment
              </button>
            )}
          </div>
        ) : (
          <div className={styles.appointmentsList}>
            <div className={styles.resultsHeader}>
              <h2 className={styles.resultsTitle}>
                {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''} found
              </h2>
            </div>
            
            {filteredAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAppoinment;
