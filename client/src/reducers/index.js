import { combineReducers } from 'redux';
import isLoggedInReducer from './isLoggedIn';
import userDataReducer from './userData';
import albumDataReducer from './albumData';
import albumListReducer from './albumList';
import imageListReducer from './imageList';

const rootReducer = combineReducers({
    isLoggedIn: isLoggedInReducer,
    userData: userDataReducer,
    albumData: albumDataReducer,
    albumList: albumListReducer,
    imageList: imageListReducer,
})

export default rootReducer