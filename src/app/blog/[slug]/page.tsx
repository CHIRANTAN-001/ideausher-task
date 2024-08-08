import { getBlogBySlug } from '@/service/blog.service'
import axios from 'axios'
import React from 'react'

const getData = async (slug: string) => {
  const res = await getBlogBySlug({ slug })
  console.log(res.data.blog)
  return res.data.blog
}

const page = async ({ params }: { params: any }) => {
  // console.log(params.slug)
  const data = await getData(params.slug)
  return (
    <>
      <div className='bg-yellow-200 min-h-screen lg:px-28 px-5 py-5'>
        <div className='bg-cyan-200 rounded-lg px-5 py-5 border-black border-2'>
          <div className='flex flex-col justify-center items-center gap-y-7'>
            <img src={data.imageUrl} className='lg:w-3/4 lg:h-[30rem]' alt="" />
            <span className='lg:text-4xl text-xl font-bold text-center'>{data.title}</span>
            <div className='flex flex-row flex-wrap lg:gap-x-4 gap-5 pt-4'>
              {data.tags.map((tag: string) => (
                <div className='bg-yellow-200 shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-full lg:px-5 px-3 lg:py-2 py-1.5'>
                  <span className='lg:text-sm text-xs font-semibold'>{tag}</span>
                </div>
              ))}
            </div>
            <span className='lg:text-lg text-gray-700'>Written by - <span className='lg:text-2xl text-black font-semibold'>{data.authorName}</span></span>
            <div className='lg:px-80 leading-5'>
              <p className='font-medium lg:text-xl text-base leading-relaxed'>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default page