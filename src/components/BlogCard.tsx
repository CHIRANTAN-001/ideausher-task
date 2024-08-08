import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import BlogInfo from './BlogInfo'

const BlogCard = ({data}) => {
  return (
      <>
          {data?.map((news) => (
              <BlogInfo newsData={news} />
          ))}
      </>
  )
}

export default BlogCard