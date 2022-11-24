import React from 'react';
import { useEffect, useState } from 'react';

function FunnyWish() {

    const saveToLocalStorage = (obj, key = 'toDoList') => window.localStorage.setItem(key, JSON.stringify(obj));
    const getFromLocalStorage = (key = 'toDoList') => JSON.parse(window.localStorage.getItem(key));

    const [catData, setCatData] = React.useState(getFromLocalStorage() || '');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFetch = () => {
        setIsLoading(true);
        fetch('/cat/')
            .then(result => result.json())
            .then(result => {
                setCatData(result)
                setIsLoading(false)
            })
            .then(saveToLocalStorage(catData))
            .catch(() => {
                setErrorMessage("Unable to fetch cat");
                setIsLoading(false);
            });
        // setCatData(mockData)
    };

    useEffect(() => {
        if (!catData) {
            handleFetch()
        }
    }, [])

    return (
        <div>
            {<img src={'https://cataas.com/' + catData.url} alt="cat" width="300" />}
            <p >Good luck, Paula!</p>
            <button onClick={handleFetch}>click</button>
        </div>
    )
}

export default FunnyWish

const mockData = { "tags": [], "createdAt": "2021-07-14T19:46:09.620Z", "updatedAt": "2022-10-11T07:52:32.538Z", "validated": true, "owner": "null", "file": "60ef3f0151a2ca0011c7455f.jpeg", "mimetype": "image/jpeg", "size": 456082, "_id": "zAHIB49ed9TPrZhQ", "url": "/cat/zAHIB49ed9TPrZhQ" }