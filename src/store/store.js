import { createStore, combineReducers } from 'redux';
import { channelsReducer } from './reducers/channelsReducer';
import { elementsReducer } from './reducers/elementsReducer';

const rootReducer = combineReducers({
    channelsReducer,
    elementsReducer
})

export const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

