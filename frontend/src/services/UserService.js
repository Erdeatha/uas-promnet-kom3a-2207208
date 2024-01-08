import axios from 'axios';

const USER_API_BASE_URL = "http://localhost:9080/users";
const tabelPasien = "http://localhost:9080/pasien_puskesmas_erdeatharamdaniputra";

class UserService {

    getPasien(){
        return axios.get(tabelPasien);
    }

    createPasien(pasien){
        return axios.post(tabelPasien, pasien);
    }

    getPasienById(pasienId){
        return axios.get(tabelPasien + '/' + pasienId);
    }

    updatePasien(pasien, pasienId){
        return axios.put(tabelPasien + '/' + pasienId, pasien);
    }

    deletePasien(pasienId){
        return axios.delete(tabelPasien + '/' + pasienId);
    }


    getUsers(){
        return axios.get(USER_API_BASE_URL);
    }

    createUser(user){
        return axios.post(USER_API_BASE_URL, user);
    }

    getUserById(userId){
        return axios.get(USER_API_BASE_URL + '/' + userId);
    }

    updateUser(user, userId){
        return axios.put(USER_API_BASE_URL + '/' + userId, user);
    }

    deleteUser(userId){
        return axios.delete(USER_API_BASE_URL + '/' + userId);
    }
}

export default new UserService()