import '.././App.css';
import Navbar from "./Navbar";
import Swal from 'sweetalert2';
import { auth, signInWithEmailAndPassword,onAuthStateChanged } from '../Firebase/config';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    function handleSignIn(event) {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful.',
                }).then(() => {
                    window.location.href = "./main";
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: errorMessage,
                });
            });
    }
    const navigate = useNavigate()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            navigate('/main')
        } else {
        }
    });

    return (
        <>
            <Navbar />
            <div className="body">
                <div className="form-outer ">
                    <h1>Sign In</h1>
                    <div className="form-inner">
                        <div className="input">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" />
                        </div>
                        <div className="input">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" id="password" />
                        </div>
                    </div>
                    <button onClick={handleSignIn}>Log In</button>
                    <a href="signup">Dont Have An Account</a>
                </div>
            </div>
        </>
    );
}
