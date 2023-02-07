import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
    return (
        <div>
            <section className='flex items-center justify-center h-screen text-center px-5'>
                <article>
                    <h1 className='text-4xl lg:text-5xl mb-8 text-bold'>Oups!</h1>
                    <h1 className='text-4xl lg:text-5xl mb-8 text-bold'>La page que vous recherchez semble introuvable.</h1>
                    <Link to='/' className='underline text-slate-600'>Retour à l'Accueil</Link>
                </article>
            </section>
        </div>
    )
}
