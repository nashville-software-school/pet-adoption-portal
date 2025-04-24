import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { getPetById, updatePet, deletePet } from '@/services/petService';
import { useAuth } from '@/context/AuthContext';
import PrivateRoute from '@/components/PrivateRoute';
import Head from 'next/head';

interface PetFormData {
  name: string;
  type: string;
  breed: string;
  age: string | number;
  gender: string;
  size: string;
  description: string;
  status: string;
}

const EditPet = () => {
  const [formData, setFormData] = useState<PetFormData>({
    name: '',
    type: 'DOG',
    breed: '',
    age: '',
    gender: 'MALE',
    size: 'MEDIUM',
    description: '',
    status: 'AVAILABLE'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
        
        // Check if the current user is the owner
        if (currentUser && petData.owner.id !== currentUser.id) {
          router.push('/profile');
          return;
        }
        
        setFormData({
          name: petData.name,
          type: petData.type,
          breed: petData.breed || '',
          age: petData.age,
          gender: petData.gender,
          size: petData.size,
          description: petData.description,
          status: petData.status
        });
      } catch (err) {
        setError('Failed to load pet details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPet();
    }
  }, [id, currentUser, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    
    try {
      if (!id) return;
      
      // Convert age to number
      const petData = {
        ...formData,
        age: parseInt(formData.age.toString(), 10)
      };
      
      await updatePet(id as string, petData);
      router.push(`/pets/${id}`);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to update pet');
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this pet?')) {
      return;
    }
    
    setDeleting(true);
    setError(null);
    
    try {
      if (!id) return;
      
      await deletePet(id as string);
      router.push('/profile');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Failed to delete pet');
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <PrivateRoute>
      <Head>
        <title>Edit Pet - Pet Adoption Portal</title>
        <meta name="description" content="Edit your pet listing" />
      </Head>
      
      <div className="edit-pet-page">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Edit Pet</h1>
          <div>
            <Link href={`/pets/${id}`} className="btn btn-outline-secondary me-2">
              Cancel
            </Link>
            <button 
              onClick={handleDelete} 
              className="btn btn-danger"
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete Pet'}
            </button>
          </div>
        </div>
        
        {error && (
          <div className="alert alert-danger">{error}</div>
        )}
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
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
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Saving...
                      </>
                    ) : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PrivateRoute>
  );
};

export default EditPet;