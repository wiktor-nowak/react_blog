import { useState, useEffect } from "react";
import axios from 'axios';

const useAxiosFetch = (dataUrl) => {
    const [data, setData] = useState([]);
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let isMounted = true;
        const source = axios.CancelToken.source();

        const fetchData = async (url) => {
            setIsLoading(true);
            try {
                const response = await axios.get(url, {
                    cancelToken: source.token
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    setData([]);
                }
            } finally {
                isMounted && setIsLoading(false)
            }
        }

        fetchData(dataUrl);

        const cleanUp = () => {
            isMounted = false;
            source.cancel();
        }

        return cleanUp;
    }, [dataUrl])

    return { data, fetchError, isLoading }
}

export default useAxiosFetch;

// TODO: Czy za każdym razem jak wchodzę do tego hook'a? tzn. np. zmieniam URL i jeszcze raz pobieram dane, (uruchanmiany jest USE EFFECT), to czy isMounted jest ustawiany na true??? => jeśli tak, to czy if(isMouted) ma sens? tz. czy może być false, w jakimś przypadku?
