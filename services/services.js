import axios from "axios";
const baseURL = 'http://localhost:8080/api/'; 
const api = axios.create({
  baseURL,
});


export const DriveUplaod = payload => {
    return api.post('drive-upload', {payload}).then(res => res.data)
}




