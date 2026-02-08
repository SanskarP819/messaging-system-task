import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:8080/api';

function App() {
  const [activeTab, setActiveTab] = useState('email');
  const [emailLogs, setEmailLogs] = useState([]);
  const [smsLogs, setSmsLogs] = useState([]);
  const [whatsappLogs, setWhatsappLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  // Form states
  const [emailForm, setEmailForm] = useState({ emailTo: '' });
  const [smsForm, setSmsForm] = useState({ mobileNumber: '', message: '' });
  const [whatsappForm, setWhatsappForm] = useState({ mobileNumber: '', message: '' });

  // Fetch data on component mount and tab change
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    await fetchEmails();
    await fetchSms();
    await fetchWhatsApp();
  };

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/email/list`);
      const data = await response.json();
      setEmailLogs(data);
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const fetchSms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/sms/list`);
      const data = await response.json();
      setSmsLogs(data);
    } catch (error) {
      console.error('Error fetching SMS:', error);
    }
  };

  const fetchWhatsApp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/whatsapp/list`);
      const data = await response.json();
      setWhatsappLogs(data);
    } catch (error) {
      console.error('Error fetching WhatsApp:', error);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailForm),
      });
      if (response.ok) {
        showNotification('Email sent successfully!');
        setEmailForm({ emailTo: '' });
        await fetchEmails();
      } else {
        const error = await response.json();
        showNotification(error.emailTo || 'Error sending email', 'error');
      }
    } catch (error) {
      showNotification('Error sending email', 'error');
    }
    setLoading(false);
  };

  const handleSmsSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/sms/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(smsForm),
      });
      if (response.ok) {
        showNotification('SMS sent successfully!');
        setSmsForm({ mobileNumber: '', message: '' });
        await fetchSms();
      } else {
        const error = await response.json();
        showNotification(error.mobileNumber || error.message || 'Error sending SMS', 'error');
      }
    } catch (error) {
      showNotification('Error sending SMS', 'error');
    }
    setLoading(false);
  };

  const handleWhatsAppSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/whatsapp/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(whatsappForm),
      });
      if (response.ok) {
        showNotification('WhatsApp message sent successfully!');
        setWhatsappForm({ mobileNumber: '', message: '' });
        await fetchWhatsApp();
      } else {
        const error = await response.json();
        showNotification(error.mobileNumber || error.message || 'Error sending WhatsApp', 'error');
      }
    } catch (error) {
      showNotification('Error sending WhatsApp message', 'error');
    }
    setLoading(false);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Messaging System Dashboard
        </h1>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('email')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'email'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📧 Email Logs
            </button>
            <button
              onClick={() => setActiveTab('sms')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'sms'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              💬 SMS Logs
            </button>
            <button
              onClick={() => setActiveTab('whatsapp')}
              className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                activeTab === 'whatsapp'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📱 WhatsApp Logs
            </button>
          </div>

          <div className="p-6">
            {/* Email Tab */}
            {activeTab === 'email' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">Email Logs</h2>
                  <button
                    onClick={fetchEmails}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    🔄 Refresh
                  </button>
                </div>
                
                {/* Email Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Serial No.</th>
                        <th className="border border-gray-300 px-4 py-2">Email Sent To</th>
                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {emailLogs.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="text-center py-4 text-gray-500">
                            No emails sent yet
                          </td>
                        </tr>
                      ) : (
                        emailLogs.map((log, index) => (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.emailTo}</td>
                            <td className="border border-gray-300 px-4 py-2">{formatTimestamp(log.timestamp)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Email Form */}
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Send Email</h3>
                  <form onSubmit={handleEmailSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={emailForm.emailTo}
                        onChange={(e) => setEmailForm({ emailTo: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      {loading ? 'Sending...' : 'Send Email'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* SMS Tab */}
            {activeTab === 'sms' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">SMS Logs</h2>
                  <button
                    onClick={fetchSms}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    🔄 Refresh
                  </button>
                </div>
                
                {/* SMS Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-green-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Serial No.</th>
                        <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
                        <th className="border border-gray-300 px-4 py-2">Message</th>
                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {smsLogs.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-gray-500">
                            No SMS sent yet
                          </td>
                        </tr>
                      ) : (
                        smsLogs.map((log, index) => (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.mobileNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.message}</td>
                            <td className="border border-gray-300 px-4 py-2">{formatTimestamp(log.timestamp)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* SMS Form */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Send SMS</h3>
                  <form onSubmit={handleSmsSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        value={smsForm.mobileNumber}
                        onChange={(e) => setSmsForm({ ...smsForm, mobileNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="9876543210"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Message
                      </label>
                      <textarea
                        value={smsForm.message}
                        onChange={(e) => setSmsForm({ ...smsForm, message: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter your message..."
                        rows="4"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 disabled:bg-gray-400"
                    >
                      {loading ? 'Sending...' : 'Send SMS'}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* WhatsApp Tab */}
            {activeTab === 'whatsapp' && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">WhatsApp Logs</h2>
                  <button
                    onClick={fetchWhatsApp}
                    className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
                  >
                    🔄 Refresh
                  </button>
                </div>
                
                {/* WhatsApp Table */}
                <div className="overflow-x-auto mb-8">
                  <table className="w-full border-collapse border border-gray-300">
                    <thead className="bg-emerald-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Serial No.</th>
                        <th className="border border-gray-300 px-4 py-2">Mobile Number</th>
                        <th className="border border-gray-300 px-4 py-2">Message</th>
                        <th className="border border-gray-300 px-4 py-2">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {whatsappLogs.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center py-4 text-gray-500">
                            No WhatsApp messages sent yet
                          </td>
                        </tr>
                      ) : (
                        whatsappLogs.map((log, index) => (
                          <tr key={log.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.mobileNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{log.message}</td>
                            <td className="border border-gray-300 px-4 py-2">{formatTimestamp(log.timestamp)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* WhatsApp Form */}
                <div className="bg-emerald-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Send WhatsApp Message</h3>
                  <form onSubmit={handleWhatsAppSubmit}>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        value={whatsappForm.mobileNumber}
                        onChange={(e) => setWhatsappForm({ ...whatsappForm, mobileNumber: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="9876543210"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 font-semibold mb-2">
                        Message
                      </label>
                      <textarea
                        value={whatsappForm.message}
                        onChange={(e) => setWhatsappForm({ ...whatsappForm, message: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="Enter your message..."
                        rows="4"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-600 disabled:bg-gray-400"
                    >
                      {loading ? 'Sending...' : 'Send WhatsApp Message'}
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;