import React, { useState, useCallback } from 'react';

const useHttp = ()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (httpConfigData, sendData) => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            httpConfigData.url,{
                method:httpConfigData.method ?httpConfigData.method:'GET',
                headers:httpConfigData.headers ? httpConfigData.headers : {},
                body:httpConfigData.body ? JSON.stringify(httpConfigData.body):null
            }
          );
    
          if (!response.ok) {
            throw new Error('Request failed!');
          }
    
          const data = await response.json();
          sendData(data);
       
          
        } catch (err) {
          setError(err.message || 'Something went wrong!');
        }
        setIsLoading(false);
      },[]);
      return {
        isLoading,
        error,
        fetchData
      }
}

export default useHttp;