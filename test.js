import axios from "axios"

const BASE_URL="http://localhost:8000/api"
async function testApi() {
  try {
    const login = await axios.post(`${BASE_URL}/login`,{email:"john@john.com",password:"john"})
    //const register = (await axios.post(`${BASE_URL}/signup`,{name:"john",email:"john@john.com",password:"john"}))
    //const logout = await axios.post(`${BASE_URL}/logout`)
    const getProfile = await axios.get(`${BASE_URL}/profile`)
    const updateProfile = await axios.put(`${BASE_URL}/profile`)
    console.log('API Response:', login.data);
    //console.log('API Response:', register.data);
    //console.log('API Response:', logout.data);
    console.log('API Response:', getProfile.data);
    console.log('API Response:', updateProfile.data);
  } catch (error) {
    console.error('Error making API call:', error.message,error.response.data);
  }
}

testApi();
