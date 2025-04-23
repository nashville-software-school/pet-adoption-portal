import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPet } from '../services/petService';

const AddPet = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'DOG',
    breed: '',
    age: '',
    gender: 'MALE',
    size: 'MEDIUM',
    description: '',
    status: 'AVAILABLE'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.age) {
      errors.age = 'Age is required';
    } else if (isNaN(formData.age) || parseInt(formData.age) < 0) {
      errors.age = 'Age must be a positive number';
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Convert age to number
      const petData = {
        ...formData,
        age: parseInt(formData.age)
      };
      
      const newPet = await createPet(petData);
      navigate(`/pets/${newPet.id}`);
    } catch (err) {
      setError('Failed to create pet. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-pet-page">
      <h1 className="mb-4">Add a Pet</h1>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Pet Name</label>
              <input
                type="text"
                className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {formErrors.name && (
                <div className="invalid-feedback">{formErrors.name}</div>
              )}
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="type" className="form-label">Type</label>
                <select
                  className="form-select"
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                >
                  <option value="DOG">Dog</option>
                  <option value="CAT">Cat</option>
                  <option value="BIRD">Bird</option>
                  <option value="RABBIT">Rabbit</option>
                  <option value="OTHER">Other</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="breed" className="form-label">Breed (Optional)</label>
                <input
                  type="text"
                  className="form-control"
                  id="breed"
                  name="breed"
                  value={formData.breed}
                  onChange={handleChange}
                />
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="age" className="form-label">Age (Years)</label>
                <input
                  type="number"
                  className={`form-control ${formErrors.age ? 'is-invalid' : ''}`}
                  id="age"
                  name="age"
                  min="0"
                  value={formData.age}
                  onChange={handleChange}
                />
                {formErrors.age && (
                  <div className="invalid-feedback">{formErrors.age}</div>
                )}
              </div>
            </div>
            
            <div className="row">
              <div className="col-md-4 mb-3">
                <label htmlFor="gender" className="form-label">Gender</label>
                <select
                  className="form-select"
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="size" className="form-label">Size</label>
                <select
                  className="form-select"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option value="SMALL">Small</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LARGE">Large</option>
                </select>
              </div>
              
              <div className="col-md-4 mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  className="form-select"
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="PENDING">Pending</option>
                  <option value="ADOPTED">Adopted</option>
                </select>
              </div>
            </div>
            
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                id="description"
                name="description"
                rows="5"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              {formErrors.description && (
                <div className="invalid-feedback">{formErrors.description}</div>
              )}
            </div>
            
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn btn-primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Saving...
                  </>
                ) : 'Add Pet'}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-secondary" 
                onClick={() => navigate('/pets')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPet;