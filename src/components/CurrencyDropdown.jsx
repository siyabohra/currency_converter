import React from 'react';

function CurrencyDropdown({ currencies, title, selectedCurrency, handleChange }) {
    console.log(Object.keys(currencies));
    return (
        <div className="mb-3">
            <label className='fst-italic fs-5'>{title}</label>
            <select className="form-select" value={selectedCurrency} onChange={handleChange}>
                { Object.keys(currencies).map((currency, index) => (
                    <option key={index} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}

export default CurrencyDropdown;


