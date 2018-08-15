import decode from 'jwt-decode';
import Config from './ProjectConfig';

export default class AuthService {
    // Initializing important variables
    constructor(domain) {
        this.domain = domain || Config.SERVER_URL // API server domain
        this.fetch = this.fetch.bind(this) // React binding stuff
        this.login = this.login.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        this.getProfile = this.getProfile.bind(this)
    }

    login(username, password) {
        // Get a token from api server using the fetch api
        return this.fetch('/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            })
        }).then(res => {
            this.setToken(res.access_token) // Setting the token in localStorage
            this.setUser(JSON.stringify(res.user))
            return Promise.resolve(res);
        })
    }

    isAuthenticated() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('access_token', idToken)
    }

    setUser(user){
        localStorage.setItem('user', user)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('access_token')
    }

    getUser(){
        return JSON.parse(localStorage.getItem('user'))
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
    }

    getProfile() {
        // Using jwt-decode npm package to decode the token
        return decode(this.getToken());
    }


    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        // Setting Authorization header
        // Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
        if (this.isAuthenticated()) {
            headers['Authorization'] = 'JWT ' + this.getToken()
        }

        return fetch(this.domain + url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            if(response.status === 401){
              alert("Você será redirecionado para o login pois não tem autorização necessário para realizar esta ação")
              localStorage.removeItem('access_token');
              localStorage.removeItem('user');
              window.location = '/login'
            }
        }
    }
}
