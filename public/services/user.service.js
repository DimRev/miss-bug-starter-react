

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    query,
    save,
    remove,
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function query(){
    return axios
    .get('/api/user')
    .then((res) => res.data)
}
function save(user){
    console.log(user);
    // return axios.put(BASE_URL, user).then((res) => res.data)
}

function remove(userId){
    console.log(userId);
    // return axios.delete(BASE_URL + userId).then(() => bugId)
}

function login({ username, password }) {
    return axios.post('/api/auth/login', { username, password })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        })
}

function signup({ username, password, fullname }) {
    return axios.post('/api/auth/signup', { username, password, fullname })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}

