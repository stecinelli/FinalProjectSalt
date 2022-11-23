import React from 'react';
import { useEffect, useState } from 'react';

function FunnyWish() {

    const [imageUrl, setImageUrl] = useState("https://cataas.com/cat");
    const [imgIsChanged, setImgIsChanged] = useState(false);

    const check = () => {
        setImgIsChanged(false)
        setImageUrl("https://cataas.com/cat")
    }
    useEffect(() => {

        if (!imgIsChanged) {
            setImageUrl("https://cataas.com/cat")
            setImgIsChanged(true)
            // console.log('true')
        }
    }, [])

    // setTimeout(setImgIsChanged(true), 5000)

    return (
        <div>{imgIsChanged && <img src={imageUrl} alt="cat" width="300" />}
            <p >Good luck, Paula!</p>
            {/* <button onClick={check}>click</button> */}
        </div>
    )
}

export default FunnyWish

