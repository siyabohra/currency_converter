import React, { useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import CurrencyDropdown from './CurrencyDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {
    setAmount,
    setToCurrency,
    setFromCurrency,
    fetchcurrencies,
    currencyConverter,
    setConvertedAmount,
} from '../feature/converter/converterSlice';

function Converter() {
    const dispatch = useDispatch();
    const currency = useSelector((state) => state.converter.currency);
    const amount = useSelector((state) => state.converter.amount);
    const fromCurrency = useSelector((state) => state.converter.fromCurrency);
    const toCurrency = useSelector((state) => state.converter.toCurrency);
    const convertedAmount = useSelector((state) => state.converter.convertedAmount);

    useEffect(() => {
        dispatch(fetchcurrencies());
    }, [dispatch]);

    useEffect(() => {
        if (amount && fromCurrency && toCurrency) {
            dispatch(currencyConverter({ fromCurrency, toCurrency, amount }));
        }
    }, [amount, fromCurrency, toCurrency, dispatch]);

    const changeHandler = (e) => {
        dispatch(setAmount(e.target.value));
    };

    const swipeCurrency = () => {
        dispatch(setFromCurrency(toCurrency));
        dispatch(setToCurrency(fromCurrency));
    };

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
                <div className='border text-center w-25 mx-auto text-white bg-black rounded-pill py-1 fontosm' onClick={swipeCurrency}>
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
                    className='my-2 inputbox'
                    value={amount}
                    onChange={changeHandler}
                /><br />
            </div>
            <p className='text-info-emphasis px-5 fs-4 fw-bold'>1 USD = 83.57 INR </p>
            {amount && convertedAmount && (
                <h4 className='currency-convert text-info-emphasis pe-3'>
                    <p className='output text-info-emphasis  fs-4 fw-bold'>{amount} {fromCurrency} = {convertedAmount} {toCurrency}</p>
                </h4>
            )}
        </div>
    );
}

export default Converter;

