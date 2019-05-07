import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN, RESET_PASSWORD_REQUEST, CLEAR_MAPSTATETOPROPS } from '../actions/types'

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    errorMessage: '',
    resData: ''
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case AUTH_SIGN_UP: 
            console.log('sign up success')
            return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '',resData: ''}
        
        case AUTH_SIGN_IN: 
            console.log('sign in success')
            return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '',resData: ''}

        case AUTH_SIGN_OUT:
            return {...state, token: action.payload, isAuthenticated: false, errorMessage: '',resData: ''}

        case RESET_PASSWORD_REQUEST:
            return {...state, resData: action.payload}

        case CLEAR_MAPSTATETOPROPS:
            return {...state, errorMessage: action.payload, resData: ''}

        case AUTH_ERROR: 
            console.log('auth error')
            return { ...state, errorMessage: action.payload}
        
        default: return state
    }
}