import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppContent } from './content/AppContent';
import { Calendar, Clock, User } from 'lucide-react';

const Appointments = () => {
  const { backendUrl } = React.useContext(AppContent);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await axios.get(backendUrl + '/api/auth/appointments', { withCredentials: true });
        if (!mounted) return;
        if (data?.success) setAppointments(data.data || []);
        else setError('Failed to load appointments');
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load appointments');
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, [backendUrl]);

  if (loading) return <div style={{ minHeight: '100vh', background: '#f0f8f5', padding: 24 }}>Loading appointments...</div>;
  if (error) return <div style={{ minHeight: '100vh', background: '#f0f8f5', padding: 24, color: 'crimson' }}>{error}</div>;

  if (!appointments.length) return (
    <div style={{ minHeight: '100vh', background: '#f0f8f5', padding: 24 }}>
      <Calendar style={{ width: 32, height: 32, color: '#14b8a6' }} />
      <h3>No appointments yet</h3>
    </div>
  );

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f8f5', /* Greenish-white background */
      padding: 24, 
      display: 'grid', 
      gap: 12 
    }}>
      {appointments.map((a) => (
        <div key={a._id} style={{ background: 'white', border: '1px solid #eee', borderRadius: 12, padding: 16, display: 'grid', gap: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700 }}>
            <User style={{ width: 18, height: 18, color: '#14b8a6' }} /> {a.doctorName}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#334155' }}>
            <Calendar style={{ width: 16, height: 16, color: '#14b8a6' }} /> {a.date}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#334155' }}>
            <Clock style={{ width: 16, height: 16, color: '#14b8a6' }} /> {a.time}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Appointments;




