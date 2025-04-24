import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getPetById } from '@/services/petService';
import { useAuth } from '@/context/AuthContext';
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
  owner: {
    id: number;
    username: string;
  };
}

const PetDetail = () => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchPet = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const petData = await getPetById(id as string);
        setPet(petData);
      } catch (err) {
        setError('Failed to load pet details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const isOwner = currentUser && pet && currentUser.id === pet.owner.id;

  return (
    <>
      <Head>
        <title>{pet ? `${pet.name} - Pet Adoption Portal` : 'Pet Details'}</title>
        <meta name="description" content={pet ? `Learn about ${pet.name}, a ${pet.age} year old ${pet.breed || pet.type}` : 'Pet details'} />
      </Head>
      
      <div className="pet-detail-page">
        <Link href="/pets" className="btn btn-outline-secondary mb-4">
          &larr; Back to Pets
        </Link>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : pet ? (
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-8">
                  <h1 className="card-title">{pet.name}</h1>
                  <h6 className="card-subtitle mb-3 text-muted">
                    {pet.breed || pet.type}
                  </h6>
                  
                  <div className="mb-4">
                    <span className={`badge ${pet.status === 'available' ? 'bg-success' : pet.status === 'pending' ? 'bg-warning' : 'bg-secondary'} me-2`}>
                      {pet.status}
                    </span>
                    <span className="badge bg-info me-2">Age: {pet.age}</span>
                    <span className="badge bg-info">Gender: {pet.gender}</span>
                  </div>
                  
                  <h5>Description</h5>
                  <p className="card-text">{pet.description}</p>
                  
                  {isOwner && (
                    <div className="mt-4">
                      <Link href={`/edit-pet/${pet.id}`} className="btn btn-primary me-2">
                        Edit Pet
                      </Link>
                    </div>
                  )}
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Contact Information</h5>
                      <p className="card-text">
                        This pet is listed by: {pet.owner.username}
                      </p>
                      {currentUser ? (
                        <p>
                          Contact the shelter for more information about adopting {pet.name}.
                        </p>
                      ) : (
                        <p>
                          <Link href="/login" className="btn btn-outline-primary">
                            Login
                          </Link> to see contact information.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="alert alert-warning">Pet not found</div>
        )}
      </div>
    </>
  );
};

export default PetDetail;