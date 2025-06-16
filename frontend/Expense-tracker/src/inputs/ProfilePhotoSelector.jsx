import React, { useRef, useState } from 'react'
import { LuUser , LuUpload , LuTrash } from 'react-icons/lu';

function ProfilePhotoSelector({image , setimage}) {
    const inputRef = useRef(null);
    const [previewimage , setpreviewimage]= useState("");

    const handleImageUpload = (event)=>{
        const file = event.target.files[0];
        
        console.log(file);

        if(file){
            setimage(file);
        }
        const preview = URL.createObjectURL(file);
        setpreviewimage(preview);
    }

    const handledeleteImage=()=>{
        setimage(null);
        setpreviewimage(null);
    }

    const onchoose =()=>{
        inputRef.current.click();
    }


  return (
    <div>
      <input 
      type="file"
      accept='image/*'
      ref={inputRef}
      name='profilephoto'
      onChange={handleImageUpload}
      className='hidden'
    />
    {!image ?(
        
        <div className='cursor-pointer w-15 h-15 relative rounded-full bg-purple-200 mx-auto'>
        <button 
        type='button' 
        onClick={onchoose} >
            <LuUser className='w-10 h-10 m-2'/>
            <LuUpload className='w-5 h-5 absolute -bottom-1 -right-1 rounded-full p-1 bg-purple-600 '/>
        </button>
        </div>
    ):(
        <div className='cursor-pointer w-15 h-15 relative rounded-full bg-purple-200 mx-auto'>
            <img  className='w-15 h-15 rounded-full'src={previewimage} alt="ProfilePhoto" />
            <button 
            type='button'
            onClick={handledeleteImage}>
                <LuTrash className='cursor-pointer w-5 h-5 absolute -bottom-1 -right-1 rounded-full p-1 bg-red-500 '/>
            </button>
        </div>
    )

    }
    
    </div>
  )
}

export default ProfilePhotoSelector
