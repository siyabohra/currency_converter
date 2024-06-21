import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// use createAsyncthunk method for fetching data from api in redux toolkit 


const ApiUrl = 'https://api.frankfurter.app';

const initialState = {
    currency: {},
    amount: 1,
    fromCurrency: "USD",
    toCurrency: "INR",
    convertedAmount:0,
    Loading: 'loading',
}

export const fetchcurrencies = createAsyncThunk('converter/fetchcurrencies', async () => {   
    const response = await fetch(`${ApiUrl}/currencies`);
    const data = await response.json();
    // console.log(Object.values(data))
    return Object.keys(data); // use keys bcoz map is not working on object and need single value
    
});




export const currencyConverter = createAsyncThunk( 'dataconverter/currencyConverter' ,async ({fromCurrency,toCurrency,amount}) => {
    console.log(fromCurrency)
        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
        const data = await response.json();
        console.log(data)
        return data.rates[toCurrency];
        // console.log(data.rates[toCurrency])
    }
)

const converterSlice = createSlice({
    name: 'converter',
    initialState:initialState,
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        setFromCurrency: (state, action) => {
            console.log(action);
            state.fromCurrency = action.payload;
        },
        setToCurrency: (state, action) => {
            state.toCurrency = action.payload;
        },
        setConvertedAmount: (state, action) => {
            state.convertedAmount = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchcurrencies.pending, (state) => {
            state.Loading = 'loading';
        });
        builder.addCase(fetchcurrencies.fulfilled, (state, action) => {
            state.Loading = 'succeeded';
            state.currency = action.payload;
        });
        builder.addCase(fetchcurrencies.rejected, (state) => {
            state.Loading = 'failed';
        });
        builder.addCase(currencyConverter.pending, (state) =>{
            state.Loading = 'loading';
        })
        builder.addCase(currencyConverter.fulfilled, (state, action)=>{
            state.Loading = 'succeeded';
            state.convertedAmount = action.payload;
        })
        builder.addCase(currencyConverter.rejected,(state,action)=>{
            state.Loading = 'failed';
        })
    }
});

export const {
    setAmount,
    setFromCurrency,
    setToCurrency,
    setConvertedAmount
} = converterSlice.actions;

export default converterSlice.reducer;
