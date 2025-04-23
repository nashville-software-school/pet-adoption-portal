import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPetById, deletePet } from '../services/petService';
import { useAuth } from '../context/AuthContext';

const PetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(id);
        setPet(data);
      } catch (err) {
        setError('Failed to load pet details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deletePet(id);
      navigate('/pets');
    } catch (err) {
      setError('Failed to delete pet');
      console.error(err);
    }
  };

  const isOwner = currentUser && pet?.owner?.id === currentUser.id;

  if (loading) {
    return (
      <div className="text-center p-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!pet) {
    return <div className="alert alert-warning">Pet not found</div>;
  }

  return (
    <div className="pet-detail-page">
      <div className="row">
        <div className="col-md-8">
          <h1>{pet.name}</h1>
          <div className="mb-3">
            <span className={`badge ${
              pet.status === 'AVAILABLE' 
                ? 'bg-success' 
                : pet.status === 'PENDING' 
                  ? 'bg-warning' 
                  : 'bg-secondary'
            } me-2`}>
              {pet.status.toLowerCase()}
            </span>
            <span className="text-muted">
              Added on {new Date(pet.created_at).toLocaleDateString()}
            </span>
          </div>
          
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">About {pet.name}</h5>
              <p className="card-text">{pet.description}</p>
            </div>
          </div>
          
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Details</h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Type:</span>
                      <span>{pet.type}</span>
                    </li>
                    {pet.breed && (
                      <li className="list-group-item d-flex justify-content-between">
                        <span>Breed:</span>
                        <span>{pet.breed}</span>
                      </li>
                    )}
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Age:</span>
                      <span>{pet.age} years</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Gender:</span>
                      <span>{pet.gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                      <span>Size:</span>
                      <span>{pet.size}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Contact</h5>
                  {pet.owner ? (
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <strong>Owner:</strong> {pet.owner.username}
                      </li>
                      <li className="list-group-item">
                        <strong>Email:</strong> {pet.owner.email}
                      </li>
                    </ul>
                  ) : (
                    <p>Contact information not available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {isOwner && (
            <div className="d-flex gap-2 mb-4">
              <Link to={`/edit-pet/${pet.id}`} className="btn btn-primary">
                Edit
              </Link>
              <button 
                className="btn btn-danger" 
                onClick={() => setShowDeleteModal(true)}
              >
                Delete
              </button>
            </div>
          )}
          
          <Link to="/pets" className="btn btn-outline-secondary">
            Back to Pets
          </Link>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete {pet.name}? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-danger" 
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetDetail;