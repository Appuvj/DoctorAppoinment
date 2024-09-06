import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AdminContext } from './AdminDashContext';

const DoctorAdminCrud = () => {
  const { fetchDatas } = useContext(AdminContext);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [gender, setGender] = useState('');
  const [imageData, setImageData] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { id } = useParams();
  const [doctorData, setDoctorData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!doctorData) {
      axios.get(`https://localhost:7146/api/Doctor/${id}`)
        .then((res) => {
          setDoctorData(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setName(doctorData.name);
      setSpecialization(doctorData.specialization);
      setMobile(doctorData.contact);
      setEmail(doctorData.email);
      setOrganization(doctorData.organization);
      setGender(doctorData.gender);
      setImageData(doctorData.imageData); // Set image data for preview
    }
  }, [doctorData, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !mobile || !specialization || !email || !organization || !gender) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await axios.put(`https://localhost:7146/api/Doctor/${id}`, {
        name,
        specialization,
        contact: mobile,
        email,
        organization,
        gender,
      });

      if (response.status === 200) {
        setSuccess('Update successful!');
        setError('');
        await fetchDatas();
        navigate('/admin/dashboard/doctors');
      }
    } catch (err) {
      setError('Update failed. Please try again.');
      setSuccess('');
    }
  };

  return (
    <div className="background">
      <div className="card card-container">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Doctor Update</h2>
          {imageData && (
            <div className="text-center mb-4">
              <img
                src={`data:image/jpeg;base64,${imageData}`}
                alt="Doctor"
                style={{ width: '150px', borderRadius: '50%' }}
              />
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile</label>
              <input
                type="text"
                id="mobile"
                className="form-control"
                placeholder="Enter mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="specialization">Specialization</label>
              <input
                type="text"
                id="specialization"
                className="form-control"
                placeholder="Enter specialization"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization</label>
              <input
                type="text"
                id="organization"
                className="form-control"
                placeholder="Enter organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <div className="form-check">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  className="form-check-input"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="male" className="form-check-label">Male</label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  className="form-check-input"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label htmlFor="female" className="form-check-label">Female</label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Update
            </button>
            {error && <div className="text-danger text-center mt-2">{error}</div>}
            {success && <div className="text-success text-center mt-2">{success}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default DoctorAdminCrud