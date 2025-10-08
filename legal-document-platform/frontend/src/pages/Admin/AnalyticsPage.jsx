import React, { useState, useEffect } from 'react';
import Card from '../../components/common/Card/Card';

const AnalyticsPage = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDocuments: 0,
    totalRevenue: 0,
    activeUsers: 0
  });

  useEffect(() => {
    setStats({
      totalUsers: 1247,
      totalDocuments: 3842,
      totalRevenue: 245800,
      activeUsers: 892
    });
  }, []);

  const StatCard = ({ title, value, icon, color }) => (
    <Card style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '48px', marginBottom: '10px' }}>{icon}</div>
      <h3 style={{ color, fontSize: '36px', marginBottom: '10px' }}>{value}</h3>
      <p style={{ color: '#666', fontSize: '16px' }}>{title}</p>
    </Card>
  );

  return (
    <div style={{ padding: '30px' }}>
      <h1 style={{ marginBottom: '30px' }}>Analytics Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <StatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          icon="👥"
          color="#3498db"
        />
        <StatCard
          title="Total Documents"
          value={stats.totalDocuments.toLocaleString()}
          icon="📄"
          color="#2ecc71"
        />
        <StatCard
          title="Total Revenue"
          value={`₹${stats.totalRevenue.toLocaleString()}`}
          icon="💰"
          color="#f39c12"
        />
        <StatCard
          title="Active Users"
          value={stats.activeUsers.toLocaleString()}
          icon="✅"
          color="#9b59b6"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '20px' }}>
        <Card>
          <h3 style={{ marginBottom: '20px' }}>Recent Activity</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { user: 'John Doe', action: 'created a document', time: '5 min ago' },
              { user: 'Jane Smith', action: 'signed a contract', time: '15 min ago' },
              { user: 'Bob Wilson', action: 'made a payment', time: '1 hour ago' }
            ].map((activity, index) => (
              <div key={index} style={{ padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
                <div style={{ fontWeight: '500', marginBottom: '5px' }}>{activity.user}</div>
                <div style={{ fontSize: '14px', color: '#666' }}>{activity.action}</div>
                <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>{activity.time}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 style={{ marginBottom: '20px' }}>Top Categories</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {[
              { category: 'Rental Agreements', count: 1245, color: '#3498db' },
              { category: 'Employment Contracts', count: 892, color: '#2ecc71' },
              { category: 'NDAs', count: 678, color: '#f39c12' }
            ].map((item, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontWeight: '500' }}>{item.category}</span>
                  <span style={{ color: '#666' }}>{item.count}</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${(item.count / 1245) * 100}%`, height: '100%', background: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
