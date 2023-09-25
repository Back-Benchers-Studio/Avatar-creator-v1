import axios from "axios";
const baseURL = 'http://localhost:8080/api/'; 
const api = axios.create({
  baseURL,
});


export const SaveModel = payload => {
    return api.post('savemodel', {payload}).then(res => res.data)
}

export const GetAllModelsOfClass = payload => {
    return api.post('getclassmodels', {payload}).then(res => res.data)
}

export const GetModelDataByID = payload => {
  return api.post('getmodel', {payload}).then(res => res.data)
}
export const GetCharacterByID = payload => {
  return api.post('character', {payload}).then(res => res.data)
}
export const PublishCharacter = payload => {
  return api.post('publishcharacter', {payload}).then(res => res.data)
}





