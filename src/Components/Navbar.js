import React, { useState } from "react";
import '.././App.css'
import { auth, signOut, onAuthStateChanged } from "../Firebase/config";
import Swal from "sweetalert2";
import logo from '../assets/download.jpeg'
import { useNavigate } from "react-router-dom";

export default function Navbar({ navbaritemfunction, navbaritem }) {
    function out() {
        signOut(auth).then(() => {
            Swal.fire({
                icon: 'success',
                title: 'User SignedOut Successful.',
            }).then(() => {
                window.location.href = "/";
            });
        }).catch((error) => {
            Swal.fire({
                icon: "error",
                title: "An Error Occured While Signing Out",
                text: error
            })
        });
    }

    const logged = () => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                SetLogin(true)
            } else {
                SetLogin(false)
            }
        });
    }
    const [login, SetLogin] = useState(false)
    const isLoggedIn = logged()
    console.log(isLoggedIn);
    const navigate = useNavigate()
  
    return (

        <>
            <nav className="nav-wrap">
                <div className="first">
                    <img src={logo} />
                    <h1>LingsCo.</h1>
                </div>
                {login ? (<div className="second"><button onClick={out}>SignOut</button><a onClick={navbaritemfunction} className="teacher">{navbaritem}</a></div>) : ("")}
            </nav>
        </>
    )
}