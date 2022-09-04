import React from 'react'

const SearchInput = ({value, onChange}) => {
    return (
        <div>
            find countries <input value={value} onChange={onChange} />
        </div>
    )
}

export default SearchInput