import axios from 'axios'
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_IN, AUTH_SIGN_OUT, RESET_PASSWORD_REQUEST, CLEAR_MAPSTATETOPROPS } from './types'



export const oauthGoogle = data => {
    return async dispatch => {
        console.log('we received', data)
        await axios.post('http://localhost:5000/user/oauth/google', {
            access_token: data
        })
        .then((res) =>{
            console.log('res', res)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('method', res.data.userData.method)
            localStorage.setItem('username', res.data.userData.username)
            localStorage.setItem('email', res.data.userData.email)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
        })
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        console.log('we received', data)
        await axios.post('http://localhost:5000/user/oauth/facebook', {
            access_token: data
        })
        .then((res) =>{
            console.log('res', res)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('method', res.data.userData.method)
            localStorage.setItem('username', res.data.userData.username)
            localStorage.setItem('email', res.data.userData.email)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}

export const oauthGithub = data => {
    return async dispatch => {
        await axios.post('http://localhost:5000/user/oauth/github', {
            access_token: data
        })
        .then((res) =>{
            console.log('res', res)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('method', res.data.userData.method)
            localStorage.setItem('username', res.data.userData.username)
            localStorage.setItem('email', res.data.userData.email)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}


export const oauthTwitter = data => {
    return async dispatch => {
        await axios.post('http://localhost:5000/user/oauth/twitter', {
            oauth_token: data.oauth_token,
            oauth_token_secret: data.oauth_token_secret
        })
        .then((res) =>{
            console.log('res', res)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('method', res.data.userData.method)
            localStorage.setItem('username', res.data.userData.username)
            localStorage.setItem('email', res.data.userData.email)
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
            
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}






export const signUp = data =>{

    const uData = {
        method: 'local',
        local: {
            username: data.username,
            email: data.email,
            password: data.password 
        }
    }

    return async dispatch => {
        try{
                await axios.post('http://localhost:5000/user/register', uData)
                            .then((res) => {
                                // Success
                                console.log('res', res)
                                dispatch({
                                    type: AUTH_SIGN_UP,
                                    payload: res.data.token
                                })
                                localStorage.setItem('token', res.data.token)
                                localStorage.setItem('method', res.data.userData.method)
                                localStorage.setItem('username', res.data.userData.username)
                                localStorage.setItem('email', res.data.userData.email)
                                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                            })
                            .catch((error) => {
                                    // Error
                                    if (error.response) {
                                        // The request was made and the server responded with a status code
                                        // that falls out of the range of 2xx
                                        console.log(error.response.data);
                                        console.log(error.response.status);
                                        dispatch({
                                            type: AUTH_ERROR,
                                            payload: error.response.data
                                        })
                                        // console.log(error.response.headers);
                                    } else if (error.request) {
                                        // The request was made but no response was received
                                        // `error.request` is an instance of XMLHttpRequest in the 
                                        // browser and an instance of
                                        // http.ClientRequest in node.js
                                    console.log(error.request);
                                    } else {
                                        // Something happened in setting up the request that triggered an Error
                                        console.log('Error', error.message);
                                    }
                                    console.log(error.config);
                                });

        }catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
            console.log('err', err)
        }
    }
} 



export const signOut = () =>{
    return dispatch => {
        localStorage.removeItem('token')
        axios.defaults.headers.common['Authorization'] = ''
        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ''
        })
    }
}

export const clearMapStateToProps = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_MAPSTATETOPROPS,
            payload:'',
            
        })
    }
}


export const signIn = data =>{

    const uData = {
        method: 'local',
        local: {
            email: data.email,
            password: data.password 
        }
    }

    return async dispatch => {
        try{
                await axios.post('http://localhost:5000/user/login', uData)
                            .then((res) => {
                                // Success
                                console.log('res', res)
                                dispatch({
                                    type: AUTH_SIGN_IN,
                                    payload: res.data.token
                                })
                                localStorage.setItem('token', res.data.token)
                                localStorage.setItem('method', res.data.userData.method)
                                localStorage.setItem('username', res.data.userData.username)
                                localStorage.setItem('email', res.data.userData.email)
                                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`
                            })
                            .catch((error) => {
                                    // Error
                                    if (error.response) {
                                        console.log(error.response.data);
                                        console.log(error.response.status);
                                        dispatch({
                                            type: AUTH_ERROR,
                                            payload: error.response.data
                                        })
                                    } else if (error.request) {
                                    console.log(error.request);
                                    } else {
                                        console.log('Error', error.message);
                                    }
                                    console.log(error.config);
                                });

        }catch(err){
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
            console.log('err', err)
        }
    }
} 


export const getDeals = () => {
    return async dispatch => {
        try{
            await axios.get('http://localhost:5000/user/special')
                    .then((res) => {
                        console.log('res', res)
                    })
                    .catch((err) =>{
                        console.log('err', err)
                    })
        }catch(err){
            console.log(err)
        }
    }
}


export const resetRequest = data => {

    const uData ={
        email: data.email
    }

    return  async dispatch => {
        try{
            await axios.post('http://localhost:5000/user/resetpassword', uData)
                    .then((res) => {
                        console.log('res', res)
                        dispatch({
                            type: AUTH_ERROR,
                            payload: ''
                        })
                        dispatch({
                            type: RESET_PASSWORD_REQUEST,
                            payload: res.data.message
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        dispatch({
                            type: RESET_PASSWORD_REQUEST,
                            payload: ''
                        })
                        dispatch({
                            type: AUTH_ERROR,
                            payload: error.response.data.message
                        })
                    })
        }catch(err){
            console.log(err)
            dispatch({
                type: AUTH_ERROR,
                payload: 'something went wrong!'
            })
        }
    }
}




export const resetConfirm = data => {
    
    

    const uData ={
        password: data.formData.password,
        confirmPassword: data.formData.confirmPassword,
        token: data.token
    }
    console.log(uData)
    
    return  async dispatch => {
        try{
            await axios.post('http://localhost:5000/user/reset', uData)
                    .then((res) => {
                        console.log('res', res)
                        
                    })
                    .catch((error) => {
                        console.log(error)
                        dispatch({
                            type: AUTH_ERROR,
                            payload: error.response.data.message
                        })
                    })
        }catch(err){
            console.log(err)
            dispatch({
                type: AUTH_ERROR,
                payload: 'something went wrong!'
            })
        }
    }
}