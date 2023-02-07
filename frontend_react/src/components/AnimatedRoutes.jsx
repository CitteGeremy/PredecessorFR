import React from 'react';
import { BrowserRouter, Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Home from '../pages/Home';
import Actu from '../pages/Actualites';
import Post from '../pages/Post';
import Error from '../pages/Error';
import AllPosts from '../pages/AllPosts';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/actu"
                    element={<Actu />}
                />
                <Route
                    path="/posts"
                    element={<AllPosts />}
                />
                <Route
                    path="/actu/:slug"
                    element={<Post />}
                />
                <Route
                    path="*"
                    element={<Error />}
                />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes