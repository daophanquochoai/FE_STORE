import React, {useEffect, useState} from 'react';
import {FaCalendarDay} from "react-icons/fa";
import BlogItem from "./BlogItem.tsx";
import {getNotifyRecent} from "../../Helper/Helper.ts";
import Skeleton from "react-loading-skeleton";
import {toast} from "react-toastify";

const Blog = () => {

    const [blogData, setBlogData] = useState<object[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const data = await getNotifyRecent();
            setIsLoading(false)
            if( data.hasOwnProperty('code') && data.code === "ERR_NETWORK"){
                toast.error("Blog don't loading!");
                return;
            }
            if( data.status === 200 ){
                setBlogData(data);
            }else{
                toast.error(data.message);
            }
        }
        fetchData()
    }, []);

    return (
        <div className={'mx-[10%] mt-16'}>
          <div className={'flex justify-between items-center'}>
              <p className={'text-3xl font-bold'}>Our Recent Blog</p>
              <button className={'bg-green_primary p-2 rounded-[7px] text-white hover:bg-yellow-200 transition-all duration-300'}>View All</button>
          </div>
          <div className={`mt-8 grid ${blogData.length > 0 ? 'grid-cols-3' : 'grid-cols-1'} gap-4`}>
              {
                 isLoading ?
                     <>
                         <Skeleton className={'h-[230px]'}/>
                         <Skeleton className={'h-[230px]'}/>
                         <Skeleton className={'h-[230px]'}/>
                     </>
                     :
                     <>
                         {
                             blogData.length >  0 ?
                             blogData.map( (blog, index) =>
                                 <BlogItem image={blog.image} time={blog.time} title={blog.title} content={blog.content} isLoading={isLoading} key={index}/>
                             )
                                 :
                                 <>
                                     <div className={'flex items-center justify-center h-[200px] w-full border-dotted border-2'}>
                                         <p className={'text-xl'}>BLOG IS EMPTY</p>
                                     </div>
                                 </>
                         }
                     </>
              }
          </div>
        </div>
    );
};

export default Blog;