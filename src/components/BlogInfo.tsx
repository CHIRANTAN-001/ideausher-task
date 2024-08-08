"use client"
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css'
import { IoIosArrowRoundForward } from "react-icons/io";
import { BlogPost } from '@/app/blog/page';

type BlogInfoProps = {
    newsData: BlogPost
}

const BlogInfo: React.FC<BlogInfoProps> = ({ newsData }) => {

    useEffect(() => {
        AOS.init({})
    }, [])

    return (
        <>
            <div className='py-5' data-aos="fade-up"
                data-aos-duration="600">
                <div key={newsData._id} className='shadow-[8px_8px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out hover:shadow-none rounded-md'>
                    <div className='overflow-hidden lg:h-64 lg:w-full rounded-t-md cursor-pointer'>
                        <img className='object-cover transform transition-transform duration-500 hover:scale-110' src={newsData?.imageUrl} alt='' />
                    </div>
                    <div className='lg:h-56 h-72 bg-cyan-200 pt-5 px-5 rounded-b-md'>
                        <div className=''>
                            <span className='text-xl cursor-pointer text-black font-semibold'>{newsData.title}</span>
                        </div>
                        <div className='flex flex-row flex-wrap gap-x-4 gap-y-2 py-5'>
                            {newsData.tags.map((tag) => (
                                <div className='bg-yellow-200 rounded-full px-4 py-1 shadow-[3px_3px_0px_rgba(0,0,0,1)]'>
                                    <span className='text-xs'>{tag}</span>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-row justify-between items-center'>
                            <span className='text-base text-gray-600 pl-2'>{newsData.authorName}</span>
                            <Link href={`/blog/${newsData.slug}`} className='bg-yellow-200 rounded-full p-3 hover:shadow-[3px_3px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-in-out cursor-pointer'>
                                <IoIosArrowRoundForward className='size-8'/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogInfo