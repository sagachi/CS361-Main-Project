import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav style={{ padding: '1rem', background: '#222', color: 'white' }}>
      <Link to="/" style={{ marginRight: '10px', color: 'white' }}>Login</Link>
      <Link to="/register" style={{ marginRight: '10px', color: 'white' }}>Register</Link>
      <Link to="/dashboard" style={{ marginRight: '10px', color: 'white' }}>Dashboard</Link>
      <Link to="/create-tournament" style={{ color: 'white' }}>Create Tournament</Link>
    </nav>
  );
}

export default Navigation;
