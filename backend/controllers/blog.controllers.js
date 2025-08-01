import fs from 'fs'
import imagekit from '../configs/imagekit.js';
import Blog from '../models/blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js';

export const addBlog=async(req,res)=>{
        try {
            const {title, subTitle, description, category, isPublished}=JSON.parse(req.body.blog);

            const imgFile=req.file;

            if(!title || !description || !category || !imgFile){
                return res.json({success: false, message: "missing required field!"})
            }

            const fileBuffer= fs.readFileSync(imgFile.path);

            // Upload image to imagekit

            const response= await imagekit.upload({
                file:fileBuffer,
                fileName: imgFile.originalname,
                folder:'/blogs'  
            });

            // optimize img through imagekit URL transformation

            const optimizeImageUrl=imagekit.url({
                path: response.filePath,
                transformation: [
                    {quality: 'auto'}, 
                    {format: 'webp'},
                    {width: '1280'},
                ]
            });

            const image= optimizeImageUrl;

            await Blog.create({title, subTitle, description, category, image, isPublished});

            res.json({success: true, message: 'Blog added successfully'})

        } catch (error) {
         res.json({success: false, message:error.message}); 
        }
};


export const getAllBlogs= async (req,res)=>{
        try {
            const blogs= await Blog.find({isPublished:true});
            res.json({success:true, blogs});
        } catch (error) {
            res.json({success: false, message:error.message}); 
        }
};

export const getBlogById=async (req,res)=>{
            try {
                const {blogId}=req.params;
                const blog= await Blog.findById(blogId);

                if(!blog){
                    return res.json({success: false, message:'blog not found!'});
                }

                 res.json({success:true, blog});
            } catch (error) {
                res.json({success: false, message:error.message}); 
            }
};

export const deleteBlogById=async (req,res)=>{
            try {
                const {id}=req.body;
                await Blog.findByIdAndDelete(id);

                // delete all comments associated with this blog
                await Comment.deleteMany({blog: id});
                res.json({success:true, message: "blog deleted successfully"});

            } catch (error) {
                res.json({success: false, message:error.message}); 
            }
};

export const togglePublished=async (req,res)=>{
            try {
                const {id}=req.body;
                const blog=await Blog.findById(id);
                blog.isPublished=!blog.isPublished;
                await blog.save();
                res.json({success:true, message: "blog status updated"});

            } catch (error) {
                res.json({success: false, message:error.message}); 
            }
};


export const addComment=async (req,res)=>{
            try {
                const {blog, name, content}=req.body;
                await Comment.create({blog, name, content});
                res.json({success:true, message: "comment added!"});

            } catch (error) {
                res.json({success: false, message:error.message}); 
            }
};


export const getBlogComments=async (req,res)=>{
            try {
                const {blogId}=req.body;
                const comments= await Comment.find({blog:blogId, isApproved:true}).sort({createdAt: -1});
                res.json({success:true, comments});

            } catch (error) {
                res.json({success: false, message:error.message}); 
            }
};

export const genrateContent=async (req,res)=>{
            try {
                const {prompt}=req.body;
                const content = await main(prompt + 'Generate a blog content for this topic in simple text format')
                res.json({success:true, content});

            } catch (error) {
                res.json({success: false, message:error.message}); 
            }
};