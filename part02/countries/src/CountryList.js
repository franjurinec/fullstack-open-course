import React from 'react'

const CountryList = ({countries, onSelect}) => {
    return (
        <div>
            {countries.map(country => 
                <div key={country.cca3}>
                    {country.name.common}
                    <button onClick={() => onSelect(country.name.common)}>show</button>
                </div>)}
        </div>
    )
}

export default CountryList