"use client"
import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../globals.css'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BlogCard from '@/components/BlogCard';
import useDebounce from '@/hooks/useDebounce';
import tags from '@/components/tagsData.json'
import Loader from '@/components/Loader';
import { getBlogDatas } from '@/service/blog.service';

export type BlogPost = {
    _id: string;
    title: string;
    description: string;
    tags: string[];
    imageUrl: string;
    authorName: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

const BlogPage = () => {

    const [data, setData] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [searchInput, setSearchInput] = useState<string>('')
    const [filteredData, setFilteredData] = useState<BlogPost[]>([]);
    const [selectedTag, setSelectedTag] = useState<string>('');

    const debouncedSearchItem = useDebounce(searchInput, 300);

    const filterData = (data: BlogPost[], search: string, tag: string) => {
        return data.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
            const matchesTag = tag ? item.tags.includes(tag) : true
            return matchesSearch && matchesTag
        })
    }

    useEffect(() => {
        const getData = async () => {
            try {
                const res = await getBlogDatas();
                setData(res.data)
                setFilteredData(filterData(res.data, debouncedSearchItem, selectedTag));
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }
        getData();
    }, [debouncedSearchItem, selectedTag])

    useEffect(() => {
        if (data.length > 0) {
            setFilteredData(filterData(data, debouncedSearchItem, selectedTag));
        }
    }, [debouncedSearchItem, selectedTag, data]);

    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchInput(event.target.value);
    };

    const handleTagChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedTag(event.target.value);
    };

    return (
        <>
            <div className='bg-yellow-200 min-h-screen'>
                {loading ? (
                <Loader/>
                ) : (
                        <Fragment>
                            <div className='flex justify-center items-center pt-10 pb-5'>
                                <div className='bg-cyan-200 px-14 py-6 rounded-md shadow-[6px_6px_0px_rgba(0,0,0,1)]'>
                                    <span className='text-3xl font-bold'>My Blogs</span>
                                </div>
                            </div>
                            <div className='grid lg:grid-cols-3 grid-cols-1 gap-x-7  lg:px-28 px-10 pt-10'>
                                <div className='lg:col-span-2 col-span-1 pb-4'>
                                    <input
                                        className='w-full h-10 border-black border-2 px-3 rounded-md text-black font-medium'
                                        type="text"
                                        value={searchInput}
                                        onChange={handleInputChange}
                                        placeholder='Seach blog'
                                    />
                                </div>
                                <div>
                                    <select
                                        className='w-full h-10 pl-5 pr-10 border-2 border-black rounded-md'
                                        onChange={handleTagChange}
                                    >
                                        <option value="" className='text-black font-medium'>Filter by tags</option>
                                        {tags.map((tag) => (
                                            <option className='text-black font-medium' key={tag.id} value={tag.name}>
                                                {tag.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='lg:px-28 px-10'>
                                <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-x-7'>
                                    {filteredData && (
                                        <BlogCard data={filteredData} />
                                    )}
                                </div>
                            </div>
                        </Fragment>
                )}
            </div>
        </>
    );
};



export default BlogPage;
