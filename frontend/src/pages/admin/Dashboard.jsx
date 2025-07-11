import React, { useEffect, useState } from 'react'
import dashIcon1 from '../../assets/dashboard_icon_1.svg'
import dashIcon2 from '../../assets/dashboard_icon_2.svg'
import dashIcon3 from '../../assets/dashboard_icon_3.svg'
import dashIcon4 from '../../assets/dashboard_icon_4.svg'
import { dashboard_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import blogIcon from "../../assets/blog.svg"
import commentIcon from '../../assets/comment.svg'
import draftIcon from '../../assets/draft.svg'
import latestBlogIcon from '../../assets/latestblog.svg'
const Dashboard = () => {

  const [dashData,setDashData]=useState({
      blogs:0,
      comments:0,
      drafts:0,
      recentBlogs:[],
  });

  const {axios}=useAppContext();


  const fetchDashData=async ()=>{
      try {
        const {data}= await axios.get('/api/admin/dashboard');
        data.success ? setDashData(data.dashboardData) : toast.error(data.message);

      } catch (error) {
        toast.error(error.message);
      }
  };

  useEffect(()=>{ fetchDashData() },[]);

  return (
    <>
    <div className='flex-1 p-4 md:p-10 bg-blue-50/50'>
    
    <div className='flex flex-wrap gap-4 '>

      <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
        <img src={blogIcon} alt="dashboard icon 1" width={50} />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.blogs}</p>
          <p className='text-gray-400 font-light'>Blogs</p>
        </div>
      </div>

      <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
        <img src={commentIcon} alt="dashboard icon 2" width={50} />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.comments}</p>
          <p className='text-gray-400 font-light'>Comments</p>
        </div>
      </div>

      <div className='flex items-center  gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
        <img src={draftIcon} alt="dashboard icon 2" width={50} />
        <div>
          <p className='text-xl font-semibold text-gray-600'>{dashData.drafts}</p>
          <p className='text-gray-400 font-light'>Drafts</p>
        </div>
      </div>
    </div>

    <div>
      <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
        <img src={latestBlogIcon} alt="dashboard icon 4" width={30}/>
        <p>Latest Blogs</p>
      </div>

      <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
      <table className='w-full text-sm text-gray-500'>
        <thead className='text-xs text-gray-600 text-left uppercase'>
          <tr>
            <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
            <th scope='col' className='px-2 py-4'>Blog Title</th>
            <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
            <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
            <th scope='col' className='px-2 py-4'>Actions</th>
          </tr>
        </thead>

        <tbody>
          {
            dashData.recentBlogs.map((blog,i)=>{
              return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashData} index={i+1}/>
            })
          }
        </tbody>

      </table>
      </div>
      
    </div>

    </div> 
    </>
  )
}

export default Dashboard
