import React from 'react';

function CurrencyDropdown({ currencies, title, selectedCurrency, handleChange }) {
    return (
        <div className="mb-3">
            <label className='fst-italic fs-5'>{title}</label>
            <select className="form-select" value={selectedCurrency} onChange={handleChange}>
                {currencies.map((currency, index) => (
                    <option key={index} value={currency}>{currency}</option>
                ))}
            </select>
        </div>
    );
}

export default CurrencyDropdown;


