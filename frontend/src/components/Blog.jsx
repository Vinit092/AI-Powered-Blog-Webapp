import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { blog_data, comments_data } from '../assets/assets';
import gradBg from '../assets/gradientBackground.png'
import moment from 'moment/moment';
import userIcon from '../assets/user_icon.svg'
import fbIcon from '../assets/facebook_icon.svg'
import twitIcon from '../assets/twitter_icon.svg'
import gpIcon from '../assets/googleplus_icon.svg'
import Loader from './Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
const Blog = () => {
    const {id}=useParams();
    const{axios}=useAppContext();

    const [data,setData]=useState(null);
    const [cmnts,setCmnts]=useState([]);
    const [name,setName]=useState('');
    const [content,setContent]=useState('');

    const fetchBlogData=async()=>{
        try {
            const {data}= await axios.get(`/api/blog/${id}`);
        data.success ? setData(data.blog) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    };

    const fetchCmnts=async()=>{
        try {
            const {data}= await axios.post('/api/blog/comments',{blogId: id});
            if(data.success){
                setCmnts(data.comments)
            }
            else{
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addComment=async (e)=>{
        e.preventDefault();

         try {
            const {data}= await axios.post('/api/blog/add-comment',{blog: id, name, content});

         if(data.success){
            toast.success(data.message);
            setName('');
            setContent('');
         }
         else{
            toast.error(data.message);
         }
         } catch (error) {
            toast.error(error.message);
         }
    };

    useEffect(()=>{ fetchBlogData(); fetchCmnts(); },[]);


  return data ? (
    <div className='relative'>
        <img src={gradBg} alt="bg" className='absolute -top-50 -z-1 opacity-75'/>
        
        <div className='text-center mt-20 text-gray-600'>
            <p className='text-primary py-4 font-medium'>Published On {moment(data.createdAt).format('MMM Do YYYY')}</p>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800'>{data.title}</h1>
            <h2 className='my-5 max-w-lg truncate mx-auto'>{data.subTitle}</h2>
            <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Vinit Suva</p>
        </div>

        <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'>
            <img src={data.image} alt="" className='rounded-3xl mb-5'/>

            <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{__html: data.description}}/>

            {/* comment section */}

            <div className='mt-14 mb-10 max-w-3xl mx-auto'>
            <p className='font-semibold mb-4'>Comments({cmnts.length})</p>
            <div className='flex flex-col gap-4'>
                {cmnts.map((item,i)=>(
                    <div key={i} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                        <div className='flex items-center gap-2 mb-2'>
                            <img src={userIcon} alt="user icon" className='w-6' />
                            <p className='font-medium'>{item.name}</p>
                        </div>
                        <p className='text-sm max-w-md ml-18'>{item.content}</p>
                        <div className='absolute right-4 bottom-3 flex items-center gap-2 text-xs'>{moment(item.createdAt).fromNow()}</div>
                    </div>
                ))}

            </div>
            </div>

                {/* comment box */}

            <div className='max-w-3xl mx-auto'>
                <p className='font-semibold mb-4'>Add your comment</p>

                <form onSubmit={addComment} className='flex flex-col gap-4 max-w-lg'>
                    <input type="text" placeholder='Enter Your Name' required className='w-full p-2 border border-gray-300 rounded outline-none' onChange={(e)=> setName(e.target.value)} value={name}/>

                    <textarea placeholder='Comments your thoughts' className='w-full p-2 border border-gray-300 rounded outline-none h-48' required onChange={(e)=>setContent(e.target.value)} value={content}/>

                    <button type='submit' className='bg-primary/90 hover:bg-primary text-white rounded p-2 px-8 hover:scale-101 duration-300 transition-all cursor-pointer'>Comment</button>
                </form>
                </div>

                {/* share buttons */}

                <div className='my-24 max-w-3xl mx-auto'>
                    <p className='font-semibold my-4'>Share this blog on social media</p>

                    <div className='flex'>
                    <img src={fbIcon} alt="facebook icon"  width={50}/>
                    <img src={twitIcon} alt="twitter icon" width={50} />
                    <img src={gpIcon} alt="google plus icon" width={50} />
                    </div>
                </div>

        </div>
    </div>
  ) : (<Loader/>)
}

export default Blog
