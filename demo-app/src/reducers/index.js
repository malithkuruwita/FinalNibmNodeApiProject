import { combineReducers } from 'redux'
import { reducer as formReducers } from 'redux-form'
import authReducer from './auth'


export default combineReducers({
    form: formReducers,
    auth: authReducer
})