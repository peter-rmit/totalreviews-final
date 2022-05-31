import axios from "axios";

export const API_URL = 'https://total-reviews-api.herokuapp.com/api/';
// export const API_URL = "http://localhost:5000/api/";

//User
export const ME_URL = `${API_URL}user/me`;
export const UPDATE_PROFILE_URL = `${API_URL}user/me`;
export const REGISTER_URL = `${API_URL}user`;
export const LOGIN_URL = `${API_URL}user/login`;
export const GET_ALL_USERS = `${API_URL}user/all`;
export const DELETE_USER_URL = `${API_URL}user/delete`;
export const UPDATE_USER_URL = `${API_URL}user/update`;
export const UPDATE_USER_PAGES_URL = `${API_URL}user/update/pages`;
export const CREATE_CLIENT_URL = `${API_URL}client/create`;
export const CREATE_BULK_CLIENTS_URL = `${API_URL}client/bulk-create`;
export const UPDATE_CLIENT_URL = `${API_URL}client/update`;
export const DELETE_CLIENT_URL = `${API_URL}client/delete`;
export const RESET_PASSWORD_URL = `${API_URL}user/reset-password`;
export const REQUEST_PASSWORD_URL = `${API_URL}user/forgot-password`;
export const GET_USER_CLIENTS_URL = `${API_URL}client/user-clients`;
export const GET_ALL_USER_CLIENTS_URL = `${API_URL}client/all-user-clients`;
export const GET_SPECIFIC_CLIENT_URL = `${API_URL}client/client-detail`;
export const CLIENT_REVIEW_REQUEST_URL = `${API_URL}review/review-request`;
export const GET_ALL_REQUEST_REVIEWERS = `${API_URL}review/all-requests`;
export const GET_ALL_REVIEWED_CLIENTS = `${API_URL}review/all-reviewed-requests`;
export const POST_GOOD_FEEDBACK = `${API_URL}review/good-review`;
export const POST_BAD_FEEDBACK = `${API_URL}review/bad-review`;
export const CHECK_FOR_REVIEW = `${API_URL}review/check-review`;
export const POST_MESSAGE = `${API_URL}review/message`;
export const CREATE_PAGE = `${API_URL}page/create`;
// export const FACEBOOK_LOGIN = `http://localhost:8080/facebook`;

//Admin
export const ADMIN_LOGIN = `${API_URL}admin/login`;
export const ADMIN_PROFILE_URL = `${API_URL}admin/profile`;
export const REQUEST_ADMIN_PASSWORD_URL = `${API_URL}admin/forgot-password`;
export const RESET_ADMIN_PASSWORD_URL = `${API_URL}/admin/reset-password`;


export const login = async (email, password) => {
  console.log('IN LOGIN API');
  return await axios.post(LOGIN_URL, { email, password })
}

export const register = async (userData) => {
  return await axios.post(REGISTER_URL, userData);
}

export const getAllUsers = async (page, filter, rows, search) => {
  console.log('rows', rows);
  return await axios.get(`${GET_ALL_USERS}?filter=${filter}&&size=${rows}&&search=${search}&&page=${page}`);
}

export const deleteUser = async (data) => {
  console.log('delete User API', data);
  return await axios.put(DELETE_USER_URL, data);
}

export const updateUser = async (userData) => {
  console.log('Update User API');
  return await axios.put(UPDATE_USER_URL, userData);
}

export const updateUserPages = async (userData) => {
  console.log('Update User Pages API');
  return await axios.put(UPDATE_USER_PAGES_URL, userData);
}


export function requestPassword(email) {
  console.log('In request password API');
  return axios.post(REQUEST_PASSWORD_URL, { email });
}

export function requestResetPassword(userData) {
  console.log('In reset Password API')
  return axios.post(RESET_PASSWORD_URL, userData);
}

export const getUserByToken = async (authToken) => {
  console.log("In Get User Profile API");
  // Authorization head should be fulfilled in interceptor.
  return await axios.post(ME_URL, { authToken });
}

export const updateProfile = async (payload) => {
  console.log("In update User Profile API", payload);
  // Authorization head should be fulfilled in interceptor.
  return await axios.put(UPDATE_PROFILE_URL, payload, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const createClient = async (clientData) => {
  console.log('create client API');
  return await axios.post(CREATE_CLIENT_URL, clientData);
}
export const CSVImport = async (clients, id) => {
  console.log('In Import CSV API', clients, id);
  return await axios.post(CREATE_BULK_CLIENTS_URL, clients, id);
}
export const getUserClient = async (userId, page, size, search) => {
  console.log('get User Clients by pagination API');
  return await axios.post(`${GET_USER_CLIENTS_URL}?page=${page}&&size=${size}&&search=${search}`, userId);
}

export const getAllUserClient = async (userId) => {
  console.log('get All User Clients API');
  return await axios.post(GET_ALL_USER_CLIENTS_URL, userId);
}

export const updateClient = async (clientData) => {
  console.log('update client API');
  return await axios.put(UPDATE_CLIENT_URL, clientData);
}

export const deleteClient = async (val) => {
  console.log('delete client API');
  return await axios.put(DELETE_CLIENT_URL, val);
}

export const clientReviewRequest = async (emails, userId, page) => {
  console.log('In Client"s Review/Rating request API >>');
  return await axios.post(CLIENT_REVIEW_REQUEST_URL, emails, userId, page)
}


export const getAllRequestReviewers = async (id) => {
  console.log('In All Request Reviewers');
  return await axios.post(GET_ALL_REQUEST_REVIEWERS, { userId: id })
}

export const getAllReviewedClients = async (id, rating, rows, search, page, day) => {
  console.log('In All reviewed request Clients');
  return await axios.post(`${GET_ALL_REVIEWED_CLIENTS}?rating=${rating}&&size=${rows}&&search=${search}&&page=${page}&&day=${day}`, { userId: id })

}

export const postGoodFeedback = async (clientData) => {
  console.log('In Post Good FeedBack API');
  return await axios.put(POST_GOOD_FEEDBACK, clientData)
}

export const postBadFeedback = async (clientData) => {
  console.log('In Post Bad FeedBack API');
  return await axios.put(POST_BAD_FEEDBACK, clientData)
}

export const checkReviewed = async (id) => {
  console.log('In check reviewed client for rating API');
  return await axios.post(CHECK_FOR_REVIEW, id);
}

export const postMessage = async (clientData) => {
  console.log('In Post Message API');
  return await axios.post(POST_MESSAGE, clientData)
}

export const storePages = async (pages) => {
  console.log('IN STORE PAGES API');
  return await axios.post(CREATE_PAGE, pages)
}

// export const facebookLogin = async () => {
//   console.log('In Facebook Login API');
//   return await axios.get(FACEBOOK_LOGIN);
// }

export const adminLogin = async (email, password) => {
  console.log('In Admin Login API');
  return await axios.post(ADMIN_LOGIN, { email, password })
}

export const getAdminByToken = async (authToken) => {
  console.log("In Get Admin Profile API");
  return await axios.post(ADMIN_PROFILE_URL, { authToken });
}

export function requestAdminPassword(email) {
  console.log('In request Admin password API');
  return axios.post(REQUEST_ADMIN_PASSWORD_URL, { email });
}

export function requestAdminResetPassword(userData) {
  console.log('In Admin Reset Password API')
  return axios.post(RESET_ADMIN_PASSWORD_URL, userData);
}