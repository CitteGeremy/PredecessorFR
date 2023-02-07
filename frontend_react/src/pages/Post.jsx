import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import client from '../client';
import UrlBuilder from '@sanity/image-url';
import { format } from 'date-fns';
import { PortableText } from "@portabletext/react";
import { motion } from 'framer-motion';

import BTT from '../components/BackToTop';

import './Post.scss';

const urlFor = source =>
    UrlBuilder({ projectId: 'wsp1bmu9', dataset: 'production' }).image(source);

const serializer = {
    types: {
        image: props =>
        (
            <figure>
                <img src={urlFor(props.value.asset._ref)}></img>
                {/*
                <h1>la clé: {props.value.asset._ref} fin de clé</h1>
                {JSON.stringify(props, null, 2)}
                */}
            </figure>
        )
    }
}


export default function Post() {
    const [post, SetPost] = useState([])
    const { slug } = useParams()


    useEffect(() => {
        client.fetch(
            `*[slug.current == "${slug}"]{
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
            }`
        ).then((data) => {
            SetPost(data[0]);
        })
    }, [slug]);


    useEffect(() => {
        const timer = setTimeout(() => {
            document.title = `${post.title}`
        }, 1000);
        return () => clearTimeout(timer);
    }, [post.title]);

    return (
        <>
            {post &&
                <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: .3 } }}>
                    <div className='post_image'>
                        {post.mainImage && (<img src={post.mainImage.asset.url} alt={post.mainImage.alt}
                            className='h-2/3 w-full object-cover shadow p_image' />)}
                        <div className='post_title_div'>
                            <h1 className='xl:text-5xl sm:text-3xl md:text-4xl post_title'>{post.title}</h1>
                        </div>
                        {post.publishedAt &&
                            (
                                <>
                                    <span className='sous_titre'>
                                        <span className='t_date'>
                                            {format(new Date(post.publishedAt), 'dd-MM-yyyy')}
                                        </span>
                                        <span className='author'>
                                            <span className='t_author'>
                                                AUTEUR
                                            </span>
                                            <span className='n_author'>
                                                {post.name}
                                            </span>
                                        </span>
                                    </span>
                                    <span className='t_date_sm'>
                                        {format(new Date(post.publishedAt), 'dd MMMM yyyy')}
                                    </span>
                                </>
                            )}
                    </div>
                    <section className='py-20 px-5 max-w-4xl mx-auto section_post'>
                        <div className='max-w-8xl flex items-center justify-center m-0'>
                            <Link to='/actu' className='py-2 px-6 rounded shadow text-white bg-transparent 
                                    hover:bg-yellow-300 border border-yellow-300 transition-all duration-200 
                                    hover:text-black font-bold absolute left-24 hidden' id='button_retour_top'>
                                Retour
                            </Link>
                        </div>

                        <BTT />

                        <div className='post_body'>
                            <PortableText value={post.body} components={serializer} />
                        </div>

                    </section>
                </motion.section>
            }
        </>
    )
}
