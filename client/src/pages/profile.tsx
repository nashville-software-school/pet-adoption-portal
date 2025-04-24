import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserPets } from '@/services/petService';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import Head from 'next/head';

interface Pet {
  id: number;
  name: string;
  type: string;
  breed: string;
  description: string;
  age: number;
  gender: string;
  status: string;
}

const Profile = () => {
  const [userPets, setUserPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchUserPets = async () => {
      try {
        setLoading(true);
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

  return (
    <PrivateRoute>
      <Head>
        <title>My Profile - Pet Adoption Portal</title>
        <meta name="description" content="Manage your profile and pets" />
      </Head>
      
      <div className="profile-page">
        <h1 className="mb-4">My Profile</h1>
        
        {currentUser && (
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Account Information</h5>
              <p><strong>Username:</strong> {currentUser.username}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
            </div>
          </div>
        )}
        
        <div className="my-pets">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2>My Pets</h2>
            <Link href="/add-pet" className="btn btn-primary">
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
            <div className="row">
              {userPets.map(pet => (
                <div key={pet.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">{pet.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {pet.breed || pet.type}
                      </h6>
                      <p className="card-text">
                        {pet.description.substring(0, 100)}...
                      </p>
                      <div className="d-flex">
                        <Link href={`/pets/${pet.id}`} className="btn btn-outline-primary me-2">
                          View
                        </Link>
                        <Link href={`/edit-pet/${pet.id}`} className="btn btn-outline-secondary">
                          Edit
                        </Link>
                      </div>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">
                        Status: <span className={`badge ${pet.status === 'available' ? 'bg-success' : pet.status === 'pending' ? 'bg-warning' : 'bg-secondary'}`}>
                          {pet.status}
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="alert alert-info">
              You haven't listed any pets yet. <Link href="/add-pet">Add a pet</Link> to get started.
            </div>
          )}
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Profile;