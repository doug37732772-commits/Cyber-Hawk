import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { AlertTriangle, Shield, Zap, TrendingUp } from 'lucide-react';
import api from '../services/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/threats/stats/summary');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Security Dashboard</h1>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Threats</p>
              <p className="text-3xl font-bold text-red-500">{stats?.total_threats || 0}</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Last 24h</p>
              <p className="text-3xl font-bold text-orange-500">{stats?.last_24h || 0}</p>
            </div>
            <Zap className="w-12 h-12 text-orange-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Last 7 Days</p>
              <p className="text-3xl font-bold text-yellow-500">{stats?.last_7d || 0}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-500 opacity-50" />
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Status</p>
              <p className="text-3xl font-bold text-green-500">Active</p>
            </div>
            <Shield className="w-12 h-12 text-green-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Threats by Severity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={Object.entries(stats?.by_severity || {}).map(([name, value]) => ({ name, value }))}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Threats by Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(stats?.by_type || {}).map(([name, value]) => ({ name, value }))}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
