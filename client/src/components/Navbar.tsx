import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      router.push('/login');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link href="/" className="navbar-brand">
          Pet Adoption Portal
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/pets" className={`nav-link ${router.pathname === '/pets' ? 'active' : ''}`}>
                Browse Pets
              </Link>
            </li>
            {currentUser && (
              <li className="nav-item">
                <Link href="/add-pet" className={`nav-link ${router.pathname === '/add-pet' ? 'active' : ''}`}>
                  Add Pet
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link href="/profile" className={`nav-link ${router.pathname === '/profile' ? 'active' : ''}`}>
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link btn btn-link">
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/login" className={`nav-link ${router.pathname === '/login' ? 'active' : ''}`}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" className={`nav-link ${router.pathname === '/register' ? 'active' : ''}`}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;