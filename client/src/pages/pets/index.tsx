import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPets } from '@/services/petService';
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

const PetList = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({
    type: '',
    status: 'available'
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const allPets = await getAllPets();
        setPets(allPets);
      } catch (err) {
        setError('Failed to load pets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter(pet => {
    if (filter.type && pet.type !== filter.type) {
      return false;
    }
    if (filter.status && pet.status !== filter.status) {
      return false;
    }
    return true;
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const petTypes = [...new Set(pets.map(pet => pet.type))];

  return (
    <>
      <Head>
        <title>Browse Pets - Pet Adoption Portal</title>
        <meta name="description" content="Browse available pets for adoption" />
      </Head>
      
      <div className="pet-list-page">
        <h1 className="mb-4">Browse Pets</h1>
        
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Filter Pets</h5>
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label htmlFor="type" className="form-label">Pet Type</label>
                    <select 
                      id="type" 
                      name="type" 
                      className="form-select"
                      value={filter.type}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Types</option>
                      {petTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-2">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select 
                      id="status" 
                      name="status" 
                      className="form-select"
                      value={filter.status}
                      onChange={handleFilterChange}
                    >
                      <option value="">All Statuses</option>
                      <option value="available">Available</option>
                      <option value="adopted">Adopted</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : filteredPets.length > 0 ? (
          <div className="row">
            {filteredPets.map(pet => (
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
                    <Link href={`/pets/${pet.id}`} className="btn btn-outline-primary">
                      View Details
                    </Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">
                      Age: {pet.age} • Gender: {pet.gender.toLowerCase()} • 
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
          <div className="alert alert-info">No pets match your filter criteria.</div>
        )}
      </div>
    </>
  );
};

export default PetList;