import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState(null);
    const [loading, setloading] = useState(false);
    const [ error, seterror ] = useState(null);
    const value = {
        captain,
        setCaptain,
        loading,
        setloading,
        error,
        seterror,
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;