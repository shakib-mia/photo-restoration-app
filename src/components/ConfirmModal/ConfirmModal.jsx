import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from '../../contexts/AppProvider';
import { fileAsUrl } from '../../utils/fileAsUrl';
import axios from 'axios';
import { gsap } from 'gsap';

const ConfirmModal = () => {
    const { file, setFile } = useContext(AppContext);
    const [url, setUrl] = useState("https://res.cloudinary.com/dioa7wt1q/image/upload/v1693048389/out._o1uvbr.jpg");
    const [outputUrl, setOutputUrl] = useState('')
    const firstImageRef = useRef(null)
    const secondImageRef = useRef(null)
    const [loading, setLoading] = useState(false)
    // console.log(store);

    useEffect(() => {
        if (file) {
            fileAsUrl(file)
                .then(result => {
                    setUrl(result);
                })
                .catch(error => {
                    console.log('Error: ', error);
                });
        }
    }, [file])



    const handleImageSubmit = () => {
        setLoading(true)
        // setTimeout(() => {
        //     setOutputUrl(url);
        //     setLoading(false)
        // }, 1000)

        const options = {
            method: 'POST',
            url: 'https://ai-powered-photo-restoration.p.rapidapi.com/',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
                'X-RapidAPI-Host': 'ai-powered-photo-restoration.p.rapidapi.com'
            },
            data: {
                pictures_url: url,
                withScratch: true
            }
        };

        url.length && axios.request(options).then(res => {
            if (res.data.result) {
                setLoading(false)
                setOutputUrl(res.data.result)
                gsap.to(firstImageRef.current, { left: '-600px', duration: 1 })
                gsap.to(secondImageRef.current, { left: '600px', duration: 1 })
            }
        }).catch(err => console.error(err))
    }


    // console.log(file);
    return (
        <div className='h-screen w-screen absolute top-0 z-[999] backdrop-blur flex flex-col items-center justify-center'>
            <div className="relative w-full h-full">
                <div className='w-full h-full flex flex-col'>
                    <div className='absolute left-0 right-0 top-0 bottom-0 m-auto z-[9999] w-[500px] h-[500px]' ref={firstImageRef}>
                        <div className="relative">
                            {loading && <div className='w-full h-full bg-black bg-opacity-75 text-white text-center flex items-center justify-center absolute top-0 left-0'>loading...</div>}
                            <img src={url} className='w-full' alt="" />
                            <h2 className='text-center mt-4 text-white text-2xl'>Your Image</h2>
                        </div>
                    </div>
                    <div className='absolute left-0 right-0 top-0 bottom-0 m-auto z-[9999] w-[500px] h-[500px]' ref={secondImageRef}>
                        {outputUrl.length ? <>
                            <img src={outputUrl} className='w-full' alt="" />
                            <h2 className='text-center mt-4 text-white text-2xl'>The Result</h2>
                        </> : <></>}
                    </div>
                </div>
                {!outputUrl.length > 0 &&
                    <button className='text-center text-white px-3 py-1 bg-green-600 rounded absolute bottom-28 left-0 right-0 m-auto w-fit' onClick={handleImageSubmit}>Confirm</button>
                }
            </div>
            <button className='text-white absolute top-5 right-7 text-[50px]' onClick={() => setFile(null)}>&times;</button>
        </div>
    );
};

export default ConfirmModal;