import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../client';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import BTT from '../components/BackToTop';

const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        client.fetch(
            `*[_type == "post"]{
                title,
                slug,
                resume,
                body,
                publishedAt,
                mainImage {
                    asset -> {
                        _id,
                        url
                    },
                    alt,
                },
                "name": author -> name,
            } | order(publishedAt desc)`
        ).then((data) => {
            setPosts(data);
        })
    }, []);


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])


    return (
        <>
            <div>

                <div className='max-w-8xl flex items-center justify-center m-20 mt-28'>
                    <Link to='/actu' className='py-2 px-6 rounded shadow text-white bg-transparent border transition-all duration-200 
                        hover:text-black font-bold absolute left-24 invisible md:visible btn_retour' id='button_retour_top'>
                        Retour
                    </Link>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl text-white capitalize font-semibold'>Tous les Posts</h1>
                </div>

                <section className='grid grid-cols-1 md:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 mb-10'>
                    {posts &&
                        posts.map((post) => (
                            <Link to={`/actu/${post.slug.current}`}>
                                <article className='transition-all duration-200 h-full' id='articles'>
                                    {post.mainImage &&
                                        <div className='rounded-md border overflow-hidden border-stone-300'>
                                            <img src={post.mainImage.asset.url} id='simage' alt={post.mainImage.alt} loading='lazy'
                                                className='h-56 w-full object-cover' />
                                        </div>
                                    }

                                    <div className='p-4 h-54 w-full'>
                                        <h2 className='text-xl flex items-center justify-center' id='card-title'>{post.title}</h2>
                                        <p className='text-sm flex items-center justify-center date_posts'>
                                            &middot; {format(new Date(post.publishedAt), 'dd/MM/yyyy')}
                                        </p>
                                        <p className='text-sm leading-relaxed'>
                                            {`${post.resume}`}
                                        </p>
                                    </div>
                                    <Link to='/posts' className='flex items-center justify-center py-2 px-6 rounded shadow text-white bg-transparent 
                                    hover:bg-yellow-300 border border-yellow-300 transition-all duration-200 
                                    hover:text-black uppercase invisible' id='card-button'>
                                        Voir plus
                                    </Link>
                                </article>
                            </Link>
                        ))}

                </section>
                {posts[0] && (
                    <BTT />
                )}
            </div>
        </>
    )
}

export default AllPosts