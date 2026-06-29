import { useAuth } from '../contexts/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-card">
        <h2>Welcome, {user?.name || 'Learner'}</h2>
        <p>You are signed in and ready to continue.</p>
        <button onClick={logout}>Log out</button>
      </div>
    </div>
  );
}
