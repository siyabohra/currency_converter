import { createSlice } from "@reduxjs/toolkit";


const converterReducer = createSlice({
    name:"converter",
    initialState: {
        currency: [],
        amount:0,
        fromCurrency:"USD",
        toCurrency:"INR",
        convertedAmount:null
    },
    reducer:{
        setCurrencies: (state,action)=>{
            state.currency = action.payload;
        },
        setAmount: (state,action)=>{
            state.amount = action.payload;
        },
        setFromCurrency: (state,action) =>{
            state.fromCurrency = action.payload
        },
        setToCurrency: (state,action) =>{
            state.toCurrency = action.payload
        },
        setConvertedAmount: (state,action) =>{
            state.convertedAmount = action.payload
        }
    }
})
export const {
    setCurrencies,
    setAmount,
    setFromCurrency,
    setToCurrency,
    setConvertedAmount
} = converterReducer.actions;
export default converterReducer.reducer;