import React from 'react'
import { onAuthStateChanged, auth } from '../Firebase/config'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Courses from './Courses';
import Footer from './Footer';
import Chat from './Chat';

function Main() {
    const navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
            navigate("/")
        }
    });
    function teacher() {
        navigate("/teacher")
    }
    return (
        <>
            <Navbar navbaritem={"Switch To Teacher"} navbaritemfunction={teacher} />
            <Hero />
            <Courses />
            <Footer />
            <Chat />
        </>
    )
}

export default Main