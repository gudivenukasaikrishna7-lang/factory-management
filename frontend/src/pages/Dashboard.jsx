import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, Users, Settings, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;
  const [data, setData] = useState({
    stats: { activeMachines: 0, totalWorkers: 0, efficiency: 0, openAlerts: 0 },
    productionTrend: [],
    machineStatus: []
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Mocking data for now, replace with actual API call
      // const response = await api.get('/dashboard');
      // setData(response.data);
      setData({
        stats: { activeMachines: 42, totalWorkers: 156, efficiency: 87, openAlerts: 3 },
        productionTrend: [
          { name: 'Mon', output: 4000 },
          { name: 'Tue', output: 3000 },
          { name: 'Wed', output: 2000 },
          { name: 'Thu', output: 2780 },
          { name: 'Fri', output: 1890 },
          { name: 'Sat', output: 2390 },
          { name: 'Sun', output: 3490 },
        ],
        machineStatus: [
          { name: 'Running', count: 35 },
          { name: 'Idle', count: 5 },
          { name: 'Maintenance', count: 2 },
        ]
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  return (
    <div>
      {/* Welcome header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          {user && (
            <p className="text-muted mb-0" style={{ fontSize: '14px' }}>
              Welcome back, <strong>{user.fullName || user.username}</strong>
            </p>
          )}
        </div>
        {user && (
          <span className="badge" style={{
            background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
            padding: '8px 16px',
            fontSize: '12px',
            fontWeight: '600',
            borderRadius: '20px'
          }}>
            {user.role || 'USER'}
          </span>
        )}
      </div>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-primary text-white rounded p-3 me-3">
                <Settings size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-0">Active Machines</h6>
                <h3 className="mb-0">{data.stats.activeMachines}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-success text-white rounded p-3 me-3">
                <Users size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-0">Total Workers</h6>
                <h3 className="mb-0">{data.stats.totalWorkers}</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-info text-white rounded p-3 me-3">
                <Activity size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-0">Efficiency</h6>
                <h3 className="mb-0">{data.stats.efficiency}%</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card shadow-sm border-0">
            <div className="card-body d-flex align-items-center">
              <div className="bg-warning text-white rounded p-3 me-3">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h6 className="text-muted mb-0">Open Alerts</h6>
                <h3 className="mb-0">{data.stats.openAlerts}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <h5 className="mb-0">Production Trend</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.productionTrend}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="output" stroke="#0d6efd" strokeWidth={3} activeDot={{ r: 8 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <h5 className="mb-0">Machine Status</h5>
            </div>
            <div className="card-body">
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.machineStatus}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#198754" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
