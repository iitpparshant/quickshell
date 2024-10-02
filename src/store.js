import {configureStore} from '@reduxjs/toolkit';
import { Reducer, DataReducer } from './Component/Reducer/Reducer';

const store = configureStore({
    reducer : {
        Reducer, DataReducer
    }
})

export default store;