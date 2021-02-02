import { combineReducers } from 'redux';
import viewReducer from './view';
import userDataReducer from './userData';
import albumDataReducer from './albumData';
import albumListReducer from './albumList';
import imageListReducer from './imageList';

const rootReducer = combineReducers({
    view: viewReducer,
    userData: userDataReducer,
    albumData: albumDataReducer,
    albumList: albumListReducer,
    imageList: imageListReducer,
})

export default rootReducer