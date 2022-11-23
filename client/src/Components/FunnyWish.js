import React from 'react';
import { useEffect, useState } from 'react';

function FunnyWish() {
    const [cat, setCat] = React.useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleFetch = () => {
        // setIsLoading(true);
        // fetch('/cat/')
        //     .then(result => result.json())
        //     .then(result => {
        //         console.log(result)
        //         setCat(result);
        //         setIsLoading(false)
        //     })
        //     .catch(() => {
        //         setErrorMessage("Unable to fetch cat");
        //         setIsLoading(false);
        //     });
        // console.log(mockData)
        setCat(mockData)
        // console.log(cat, 'mock')
    };

    useEffect(() => {
        if (!cat.length) {
            handleFetch()
            // console.log(cat, 'mock2')
        }
    }, [])

    // setTimeout(
    //     console.log(cat, '5sec'), 5000
    // )
    return (
        <div><img src={mockData[0].img} alt="cat" width="300"  />
        <p>Good luck, Paula!</p>
        </div>
    )
}

export default FunnyWish

const mockData = [{ "img": "https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half-caption/public/field_blog_entry_images/2022-05/cat-common-misunderstanding-pexels-krysten-merriman-20787.jpg?itok=GKHnjgcf" }]