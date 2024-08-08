import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BlogInfo from './BlogInfo'
import { BlogPost } from '@/app/blog/page'

type BlogCardProps = {
    data: BlogPost[]
}

const BlogCard: React.FC<BlogCardProps> = ({data}) => {
  return (
      <>
          {data?.map((news) => (
              <BlogInfo newsData={news} />
          ))}
      </>
  )
}

export default BlogCard