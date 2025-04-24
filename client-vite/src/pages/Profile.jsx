import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserPets } from '../services/petService';

const Profile = () => {
  const { currentUser } = useAuth();
  const [userPets, setUserPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        const pets = await getUserPets();
        setUserPets(pets);
      } catch (err) {
        setError('Failed to load your pets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPets();
  }, []);

  if (!currentUser) {
    return (
      <div className="alert alert-warning">
        You need to be logged in to view your profile.
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="row">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="card-title">Profile</h2>
              <div className="mb-3">
                <strong>Username:</strong> {currentUser.username}
              </div>
              <div className="mb-3">
                <strong>Name:</strong> {currentUser.first_name} {currentUser.last_name}
              </div>
              <div className="mb-3">
                <strong>Email:</strong> {currentUser.email}
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="card-title">My Pets</h2>
                <Link to="/add-pet" className="btn btn-primary">
                  Add New Pet
                </Link>
              </div>
              
              {loading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : userPets.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Added</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userPets.map(pet => (
                        <tr key={pet.id}>
                          <td>{pet.name}</td>
                          <td>{pet.type} {pet.breed && `(${pet.breed})`}</td>
                          <td>
                            <span className={`badge ${
                              pet.status === 'AVAILABLE' 
                                ? 'bg-success' 
                                : pet.status === 'PENDING' 
                                  ? 'bg-warning' 
                                  : 'bg-secondary'
                            }`}>
                              {pet.status.toLowerCase()}
                            </span>
                          </td>
                          <td>{new Date(pet.created_at).toLocaleDateString()}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link 
                                to={`/pets/${pet.id}`} 
                                className="btn btn-outline-primary"
                              >
                                View
                              </Link>
                              <Link 
                                to={`/edit-pet/${pet.id}`} 
                                className="btn btn-outline-secondary"
                              >
                                Edit
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="alert alert-info">
                  You haven't added any pets yet. 
                  <Link to="/add-pet" className="alert-link ms-2">
                    Add your first pet
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;