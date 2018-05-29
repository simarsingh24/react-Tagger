import { combineReducers } from 'redux'
import boxReducer from './boxReducer'
import imageReducer from './imageReducer'

const rootReducer = combineReducers ({
    boxReducer,
    imageReducer
});

export default rootReducer;