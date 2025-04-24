import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { createPet } from '@/services/petService';
import PrivateRoute from '@/components/PrivateRoute';
import Head from 'next/head';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Convert age to number
      const petData = {
        ...formData,
        age: parseInt(formData.age, 10)
      };
      
      await createPet(petData);
      router.push('/profile');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to add pet');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PrivateRoute>
      <Head>
        <title>Add a Pet - Pet Adoption Portal</title>
        <meta name="description" content="List a pet for adoption" />
      </Head>
      
      <div className="add-pet-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Add a Pet</h1>
          <Link href="/profile" className="btn btn-outline-secondary">
            Cancel
          </Link>
        </div>
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        <div className="card">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Pet Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="type" className="form-label">Pet Type</label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="DOG">Dog</option>
                    <option value="CAT">Cat</option>
                    <option value="BIRD">Bird</option>
                    <option value="RABBIT">Rabbit</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="breed" className="form-label">Breed</label>
                  <input
                    type="text"
                    className="form-control"
                    id="breed"
                    name="breed"
                    placeholder="Optional"
                    value={formData.breed}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="row mb-3">
                <div className="col-md-4">
                  <label htmlFor="age" className="form-label">Age</label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    name="age"
                    min="0"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="size" className="form-label">Size</label>
                  <select
                    className="form-select"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    required
                  >
                    <option value="SMALL">Small</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LARGE">Large</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label htmlFor="status" className="form-label">Status</label>
                  <select
                    className="form-select"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    required
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
                  className="form-control"
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <div className="d-grid">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Adding Pet...
                    </>
                  ) : 'Add Pet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default AddPet;