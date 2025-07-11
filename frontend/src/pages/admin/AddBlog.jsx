import React, { useEffect, useRef, useState } from 'react'
import UploadArea from '../../assets/upload_area.svg'
import Quill from 'quill';
import { blogCategories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';
import {parse} from 'marked'
const AddBlog = () => {

  const {axios}=useAppContext();
  const [isAdding,setIsAdding]=useState(false);
  const [loading,setLoading]=useState(false);

  const [img,setImg]=useState(false);
  const [title,setTitle]=useState('');
  const [subTitle,setSubTitle]=useState('');
  const [category,setCategory]=useState('Startup');
  const [isPublished,setIsPublished]=useState(false);


  const editorRef=useRef(null);
  const quillRef=useRef(null);

  const onSubmitHandler=async(e)=>{
      e.preventDefault();

      try {
        setIsAdding(true);

        const blog={
          title,subTitle,
          description: quillRef.current.root.innerHTML,
          category, isPublished
        };

        const formData= new FormData();
        formData.append('blog', JSON.stringify(blog));
        formData.append('image', img);

        const {data}= await axios.post('/api/blog/add',formData);

        if(data.success){
          toast.success(data.message);
          setImg(false);
          setTitle('');
          quillRef.current.root.innerHTML='';
          setCategory('Startup');
        }
        else{
          toast.error(data.message);
        }

      } catch (error) {
        toast.error(error.message);
      }
      finally{
        setIsAdding(false); 
      }
  };

  const genContent=async ()=>{
   if(!title) return toast.error("please enter a title");

   try {
    setLoading(true);
    const {data} = await axios.post('/api/blog/generate',{prompt: title});
    if(data.success){
      quillRef.current.root.innerHTML = parse(data.content);
    }
    else{
      toast.error(data.message)
    }
   } catch (error) {
      toast.error(error.message);
   }finally{
    setLoading(false);
   }

  };

  useEffect(()=>{if(!quillRef.current && editorRef.current){
    quillRef.current = new Quill(editorRef.current,{theme:"snow"})
  }},[]);

  return (
    <>
     <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
     <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>

      <p>Upload Thumbnail</p>
      <label htmlFor="image">
        <img src={!img ? UploadArea : URL.createObjectURL(img)} alt="upload area icon" className='mt-2 h-16 rounded cursor-pointer'/>
        <input type="file" id='image' required onChange={(e)=>setImg(e.target.files[0])}/>
      </label>

      <p className='mt-4'>Blog Title</p>
      <input type="text" placeholder='Type Here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setTitle(e.target.value)} value={title}/>

      <p className='mt-4'>Subtitle</p>
      <input type="text" placeholder='Type Here' required className='w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded' onChange={(e)=>setSubTitle(e.target.value)} value={subTitle}/>

      <p className='mt-4'>Blog Description</p>
      <div className='max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative'>
        <div ref={editorRef}/>
        {
        loading && (<div className='absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-black/10 mt-2'>
            <div className='w-8 h-8 rounded-full border-2 border-t-white animate-spin'>

            </div>
        </div>)
        }
        <button type='button' disabled={loading} onClick={genContent} className='absolute bottom-1 right-2 ml-2 text-xs text-white bg-black/70 px-4 py-1.5 rounded hover:underline cursor-pointer'>Generate With AI</button>

      </div>
      <p className='mt-4'>Blog Category</p>
      <select onChange={(e)=>setCategory(e.target.value)} name="category" className='mt-2 px-3 py-2 border text-gray-500 border-gray-300 outline-none rounded'>
        <option value="">Select Category</option>
        {
          blogCategories.map((item,i)=>{
            return <option key={i} value={item}>{item}</option>
          })
        }
      </select>

      <div>
        <p>Publish Now</p>
        <input type="checkbox" checked={isPublished} className='scale-125 cursor-pointer' onChange={(e)=>setIsPublished(e.target.checked)}/>
      </div>

        <button type='submit' disabled={isAdding} className='mt-8 w-40 h-10 bg-primary text-white rounded cursor-pointer'>
          {
            isAdding 
            ? (<div className='animate-pulse text-xl'>Adding...</div>)
            : (<div className='text-xl'>Add Blog</div>)
          }
        </button>
     </div>
    </form> 
    </>
  )
}

export default AddBlog
