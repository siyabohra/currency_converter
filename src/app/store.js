import { configureStore } from "@reduxjs/toolkit";
import converterReducer from "../feature/converter/converterSlice";

const store = configureStore({
    reducer:{
        converter: converterReducer
    }
});

export default store;