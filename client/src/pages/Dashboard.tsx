import React from "react";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is a protected route.</p>
      <p>
        This Application will auto logouts, if the user is inActive for 10 secs!
      </p>
    </div>
  );
};

export default Dashboard;
