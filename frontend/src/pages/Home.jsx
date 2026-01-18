import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home">
      <div className="container">
        <div className="hero">
          <h1>Welcome to PERN CRUD App</h1>
          <p>
            A full-stack application built with PostgreSQL, Express, React, and Node.js.
            Features JWT authentication and simple CRUD operations.
          </p>
          <div className="hero-buttons">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="features">
          <div className="feature-card">
            <h3>User Authentication</h3>
            <p>Secure JWT-based authentication for user registration and login.</p>
          </div>
          <div className="feature-card">
            <h3>CRUD Operations</h3>
            <p>Create, read, update, and delete items with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Modern Stack</h3>
            <p>Built with PostgreSQL, Express, React, and Node.js.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
