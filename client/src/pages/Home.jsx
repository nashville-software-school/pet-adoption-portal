import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAvailablePets } from '../services/petService';

const Home = () => {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedPets = async () => {
      try {
        const pets = await getAvailablePets();
        // Get up to 3 random pets to feature
        const randomPets = pets.sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedPets(randomPets);
      } catch (err) {
        setError('Failed to load featured pets');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedPets();
  }, []);

  return (
    <div className="home-page">
      <div className="jumbotron bg-light p-5 rounded mb-4">
        <h1 className="display-4">Find Your Perfect Companion</h1>
        <p className="lead">
          Welcome to the Pet Adoption Portal. We help connect loving homes with pets in need.
        </p>
        <hr className="my-4" />
        <p>
          Browse our available pets or register to list a pet for adoption.
        </p>
        <Link to="/pets" className="btn btn-primary btn-lg">
          Browse Pets
        </Link>
      </div>

      <h2 className="mb-4">Featured Pets</h2>
      
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : featuredPets.length > 0 ? (
        <div className="row">
          {featuredPets.map(pet => (
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
                  <Link to={`/pets/${pet.id}`} className="btn btn-outline-primary">
                    View Details
                  </Link>
                </div>
                <div className="card-footer text-muted">
                  Age: {pet.age} • Gender: {pet.gender.toLowerCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="alert alert-info">No pets available right now. Check back soon!</div>
      )}

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Adopt a Pet</h5>
              <p className="card-text">
                Find your perfect companion from our selection of available pets.
              </p>
              <Link to="/pets" className="btn btn-outline-primary">Browse Pets</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">List a Pet</h5>
              <p className="card-text">
                Have a pet that needs a new home? List them on our portal.
              </p>
              <Link to="/add-pet" className="btn btn-outline-primary">Add a Pet</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Join Our Community</h5>
              <p className="card-text">
                Create an account to list pets, save favorites, and more.
              </p>
              <Link to="/register" className="btn btn-outline-primary">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;