import { useCallback, useState, useEffect } from "react";
export function useHttps(init){
    const [isLoading, setLoading] = useState(false);
    const [isError, setisError] = useState();
    const [data, setData] = useState(init.items);
    const getdata = useCallback(async function getdata(cus) {
        setLoading(true);
        try {cus
            const response = await fetch(init.url, { ...init.config, body: cus });
            const data = await response.json();
            setData(data);
            if(!response.ok){
                throw new Error('Failed to load data.')
            }
        }
        catch (error) {
            setisError(error);
        }
        setLoading(false);
    }, [init.url, init.config])
    useEffect(() => {
        if (!Object.entries(init.config).length){
            getdata();
        }
    }, [getdata]);
    return {
        isLoading,
        isError,
        data,
        getdata
    }
  
}