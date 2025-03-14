import React from 'react';

const LocationSearchPanel = ({ suggestions, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion.title);        
        } else if (activeField === 'destination') {
            setDestination(suggestion.title);
        }
    
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            {/* Display fetched suggestions */}
            {
                Array.isArray(suggestions) && suggestions.length > 0 ? (
                    suggestions.map((elem, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => { 
                                handleSuggestionClick(elem)
                            }
                        } 
                            className='flex gap-4 p-3 border border-gray-200 hover:border-black rounded-lg items-center my-2 cursor-pointer transition duration-200 ease-in-out transform hover:scale-105'
                        >
                            <div>
                                <h4 className='font-semibold text-lg'>{elem.title}</h4>
                                <p className='text-sm text-gray-600'>{elem.address.label}</p>
                            </div>
                        </div>
                    ))
                )
                :
                (
                    <div className='flex gap-4 p-3 border border-gray-200 rounded-lg items-center my-2'>
                        <div>
                            <h4 className='font-medium text-lg'>No results found</h4>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default LocationSearchPanel;