import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CurrencyDropdown from './CurrencyDropdown';
import { useDispatch , useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
    setCurrencies,
    setAmount,
    setToCurrency,
    setFromCurrency,
    setConvertedAmount,
} from '../feature/converter/converterSlice';

function Converter() {

    const dispatch = useDispatch();
    const currency = useSelector((state)=>state?.converterReducer?.currency??[]);
    const amount = useSelector((state)=>state?.converterReducer?.amount??0);
    const fromCurrency = useSelector((state)=>state?.converterReducer?.fromCurrency??"");
    const toCurrency = useSelector ((state)=> state?.converterReducer?.toCurrency ??"");
    const convertedAmount = useSelector ((state)=> state?.converterReducer?.convertedAmount ?? 0);


    // const [currencies, setCurrencies] = useState([]);
    // const [amount, setAmount] = useState(0);
    // const [fromCurrency, setFromCurrency] = useState("USD");
    // const [toCurrency, setToCurrency] = useState("INR");
    // const [convertedAmount, setConvertedAmount] = useState(null);
    // function to fetch currencies data

    const fetchCurrencies = async () => {
        try {
            const res = await fetch("https://api.frankfurter.app/currencies");
            const data = await res.json(); // convert js object into json format
            console.log(data)
            dispatch(setCurrencies(data));
        } catch (err) {
            console.error('Error fetching data', err);
        }
    }

    // main * after using this onchange event giving proper event 
    useEffect(() => {
        fetchCurrencies();
        currencyConverter();
        if (amount === "") {
            dispatch(setConvertedAmount("")) // in case of empty input
        }

    }, []); // whenever amount or currency updated 

    const changeHandler = (e) => {
        dispatch(setAmount(e.target.value));
    };

    const currencyConverter = async () => {
        try {
            const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await res.json();
            dispatch(setConvertedAmount(data.rates[toCurrency]));
            console.log(data.rates[toCurrency]);
        } catch (err) {
            console.error('Error converting currency', err);
        }
    }

    const swipeCurrency = () => {
        dispatch(setFromCurrency(toCurrency));
        dispatch(setToCurrency(fromCurrency))
    }

    return (

        <div className='w-25 border bg-white mx-auto rounded convertor'>
            <h2 className='text-center fst-italic text-info-emphasis border-bottom-2'>Currency Converter</h2>
            <div className='px-4'>
                <CurrencyDropdown
                    currencies={currency}
                    title='From:'
                    selectedCurrency={fromCurrency}
                    handleChange={(e) => dispatch(setFromCurrency(e.target.value))}
                />
                <br />

                <div className='border text-center w-25 mx-auto  text-white bg-black  rounded-pill py-2 fontosm' onClick={swipeCurrency}>
                    <FontAwesomeIcon icon={faArrowDown} />
                    <FontAwesomeIcon icon={faArrowUp} />
                </div>

                <CurrencyDropdown
                    currencies={currency}
                    title='To:'
                    selectedCurrency={toCurrency}
                    handleChange={(e) => dispatch(setToCurrency(e.target.value))}
                />
            </div>
            <div className='w-25 p-4 text-center'>
                <label htmlFor="currency" className='fst-italic fs-5'>Amount:</label><br />
                <input
                    type="number"
                    className='my-2'
                    value={amount}
                    onChange={changeHandler}
                /><br />

                <button
                    className='bg-black  text-white fst-italic fs-5 rounded border-0 my-2'
                    onClick={currencyConverter}
                >
                    Convert
                </button>
            </div>
            {
                convertedAmount !== null &&  (
                    <h4 className='currency-convert text-info-emphasis  px-2'>
                        <p className='text-info-emphasis'> 1 USD = 83.43 INR</p>
                        <p className='output'> {amount} {fromCurrency} = {convertedAmount} {toCurrency} </p>
                    </h4>
                )}
        </div>

    );
}

export default Converter;
