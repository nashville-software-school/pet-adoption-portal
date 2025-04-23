import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllPets } from '../services/petService';

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    search: ''
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAllPets();
        setPets(data);
      } catch (err) {
        setError('Failed to load pets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredPets = pets.filter(pet => {
    // Filter by type
    if (filters.type && pet.type !== filters.type) {
      return false;
    }
    
    // Filter by status
    if (filters.status && pet.status !== filters.status) {
      return false;
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      return (
        pet.name.toLowerCase().includes(searchTerm) ||
        pet.breed.toLowerCase().includes(searchTerm) ||
        pet.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return true;
  });

  return (
    <div className="pet-list-page">
      <h1 className="mb-4">Available Pets</h1>
      
      <div className="row mb-4">
        <div className="col-md-3">
          <select
            className="form-select"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">All Types</option>
            <option value="DOG">Dogs</option>
            <option value="CAT">Cats</option>
            <option value="BIRD">Birds</option>
            <option value="RABBIT">Rabbits</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="">All Statuses</option>
            <option value="AVAILABLE">Available</option>
            <option value="PENDING">Pending</option>
            <option value="ADOPTED">Adopted</option>
          </select>
        </div>
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search pets..."
            name="search"
            value={filters.search}
            onChange={handleFilterChange}
          />
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
                  <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/pets/${pet.id}`} className="btn btn-outline-primary">
                      View Details
                    </Link>
                    <span className={`badge ${
                      pet.status === 'AVAILABLE' 
                        ? 'bg-success' 
                        : pet.status === 'PENDING' 
                          ? 'bg-warning' 
                          : 'bg-secondary'
                    }`}>
                      {pet.status.toLowerCase()}
                    </span>
                  </div>
                </div>
                <div className="card-footer text-muted">
                  Age: {pet.age} • Gender: {pet.gender.toLowerCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No pets found matching your criteria.</div>
      )}
    </div>
  );
};

export default PetList;