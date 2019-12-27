import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore} from 'redux-persist';
import rootSaga from './saga';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

const bindMiddleware = middleware => {
    if (process.env.NODE_ENV !== 'production') {
        const {composeWithDevTools} = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
};
export default (initialState) => {
    let store;
    const sagaMiddleware = createSagaMiddleware();
    const isClient = typeof window !== 'undefined';
    if (isClient) {
        // const {persistReducer} = require('redux-persist');
        // const storage = require('redux-persist/lib/storage').default;
        // const persistConfig = {
        //     key: 'root',
        //     storage
        // };
        store = createStore(
            rootReducer,
            initialState,
            bindMiddleware([sagaMiddleware, thunkMiddleware, logger])
        );
        store.__PERSISTOR = persistStore(store);
    } else {
        store = createStore(
            rootReducer,
            initialState,
            bindMiddleware([sagaMiddleware, thunkMiddleware, logger])
        );
    }
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
};
