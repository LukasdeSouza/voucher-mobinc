import {jwtDecode} from 'jwt-decode';

export const setToken = (token) => {
    localStorage.setItem('@mobinc-token', token)

}

export const getToken = (decodeToken) => {
    const token = localStorage.getItem('@mobinc-token')
    if (decodeToken) {
        const decryptedToken = jwtDecode(token)
        return decryptedToken
    }
    return token
}
