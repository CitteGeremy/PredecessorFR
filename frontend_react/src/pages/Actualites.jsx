import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import client from '../client';
import { format } from 'date-fns';
import { motion } from 'framer-motion';


export default function Actualites() {
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
            setPosts(data.slice(0, 6));
        })
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [])

    useEffect(() => {
        document.title = `Actualités - Predecessor`
    }, [])


    return (
        <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .3 } }}>

                {!posts ? (
                    <h2>Chargement ...</h2>
                ) : (
                    <>
                        {posts[0] && (
                            <section className='max-w-7xl mx-auto my-20 px-5'>
                                <Link to={`/actu/${posts[0].slug.current}`}>
                                    <article className='relative'>
                                        {posts[0].mainImage && <img src={posts[0].mainImage.asset.url} alt={posts[0].mainImage.alt} className='h-96 w-full object-cover rounded-2xl' id='mainimage' />}
                                        <div className='absolute bottom-8 left-8'>
                                            <h1 className='text-4xl lg:text-5xl mb-6 text-white capitalize big_card_title'>{posts[0].title}</h1>
                                            <p className='text-scale-200 mb-8 md:w-1/2'>
                                                {/* {`${posts[0].body[0].children[0].text.substring(0, 200)} ...`} */}
                                                {`${posts[0].resume}`}
                                            </p>
                                            <Link to={`/actu/${posts[0].slug.current}`} className='animate-pulse py-2 px-6 rounded shadow text-white bg-transparent
                                             border transition-all duration-200 hover:text-black btn_retour'>Voir plus</Link>
                                        </div>
                                    </article>
                                </Link>
                            </section>
                        )}
                    </>
                )}

                <section className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto px-5 mb-10'>
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
                                    <Link to='/post' className='flex items-center justify-center py-2 px-6 rounded shadow text-white bg-transparent 
                                    hover:bg-yellow-300 border border-yellow-300 transition-all duration-200 
                                    hover:text-black uppercase invisible' id='card-button'>
                                        Voir plus
                                    </Link>
                                </article>
                            </Link>
                        ))}
                </section>

                {posts[0] && (
                    <div className='max-w-7xl mx-auto px-5 mb-20 mt-20 flex items-end justify-end'>
                        <Link to='/posts' className='py-2 px-6 rounded shadow text-white bg-transparent
                         border transition-all duration-200 
                        hover:text-black font-bold btn_retour'>
                            Voir tous les posts
                        </Link>
                    </div>
                )}
            </motion.div>
        </>
    )
}
