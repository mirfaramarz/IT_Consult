import React from 'react';
import TopNavbar from '../components/Nav/TopNavbar';

function Dashboard() {
  return (
    <>
      <TopNavbar />
      <div style={{ paddingTop: "100px" }}>  {/* Add padding to account for fixed navbar */}
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </div>
    </>
  );
}

export default Dashboard;