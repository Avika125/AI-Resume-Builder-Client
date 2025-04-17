import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data);

const GetUserResumes = (userEmail) => axiosClient.get('/user-resumes');

// ✅ Get a single resume by ID
const GetSingleResume = (id) => axiosClient.get('/user-resumes/' + id);

// ✅ Fixed typo and added slash
const UpdateResumeDetail = (id, data) => axiosClient.put('/user-resumes/' + id, data);

export default {
  CreateNewResume,
  GetUserResumes,
  GetSingleResume,
  UpdateResumeDetail
};
