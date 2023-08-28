import { useContext } from 'react';
import { AppContext } from '../../contexts/AppProvider';

const DropArea = () => {
    const { dropping, setDropping, setFile } = useContext(AppContext)
    // console.log(file?.name);
    return <>
        <div className='h-full absolute w-screen bg-gray-700 top-0 left-0 text-white flex items-center justify-center'>
            <div className={`h-1/2 bg-[#22c55ece] rounded-full aspect-square p-16 transition-all duration-1000 ease-out ${dropping ? 'scale-125' : 'scale-100'}`}>
                <input type="file" name='image' id='file' accept='image/*' className={'opacity-0 w-full h-full absolute z-30'} onDragEnter={() => setDropping(true)} onDragLeave={() => setDropping(false)} onDrop={() => setDropping(false)} onChange={e => setFile(e.target.files[0])} />
                <div className={`${dropping && 'scale-125'} transition duration-1000 ease-out w-full h-full bg-green-500 rounded-full flex items-center justify-center`}>
                    <p className='z-50 text-xl font-bold'>{dropping ? <>Drop &#128521;</> : <>Drop your file or <label htmlFor='file' className='cursor-pointer underline hover:no-underline'>click here</label></>}</p>
                </div>
            </div>
        </div>
        {/* <input type="submit" value='submit' className='text-white text-[40px] absolute left-0 top-10 z-50 cursor-pointer' /> */}
    </>;
};

export default DropArea;