import { createContext, useState, useEffect } from "react";import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../hooks/useAxiosFetch'

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    
    const [posts, setPosts] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => {
        setPosts(data);
    }, [data])

    return (
        <DataContext.Provider value={{
            posts, setPosts, searchResults, navigate, setSearchResults, fetchError, isLoading
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;