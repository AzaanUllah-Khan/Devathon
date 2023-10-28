import React, { useEffect, useState } from 'react';
import logo from '../assets/download.jpeg';
import Swal from 'sweetalert2';
import { onAuthStateChanged, auth, getDocs, collection, db, addDoc } from '../Firebase/config';

function Chat() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        document.getElementById('iii').addEventListener('click', () => {
            document.getElementById('innerii').classList.toggle('open');
        });

        document.getElementById('-').addEventListener('click', () => {
            document.getElementById('innerii').classList.toggle('open');
        });

        document.getElementById('+').addEventListener('click', () => {
            if (!open) {
                document.getElementById('u').style.visibility = "visible";
                document.getElementById('u').style.opacity = "1";
                setOpen(true);
            } else {
                document.getElementById('u').style.visibility = "hidden";
                document.getElementById('u').style.opacity = "0";
                setOpen(false);
            }
        });

        document.getElementById("chatBtn").addEventListener('click', () => {
            if (localStorage.getItem('logged') === "true") {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        const uid = user.uid;
                        const querySnapshot = await getDocs(collection(db, "users"));
                        querySnapshot.forEach((doc) => {
                            if (doc.id === uid) {
                                console.log(`${doc.id} => ${JSON.stringify(doc.data().name)}`);
                                Swal.fire({
                                    title: 'Submit your Feedback',
                                    input: 'text',
                                    inputAttributes: {
                                        autocapitalize: 'on'
                                    },
                                    showCancelButton: true,
                                    confirmButtonText: 'Send Feedback',
                                    showLoaderOnConfirm: true,
                                    allowOutsideClick: () => !Swal.isLoading()
                                }).then(async (result) => {
                                    if (result.isConfirmed) {
                                        try {
                                            const docRef = await addDoc(collection(db, "feedback"), {
                                                sentby: doc.data().name,
                                                feedback: result.value
                                            });
                                            console.log("Document written with ID: ", docRef.id);
                                        } catch (e) {
                                            console.error("Error adding document: ", e);
                                        }

                                        Swal.fire({
                                            title: `${doc.data().name} Thanks For Your Feedback`,
                                            text: "Feedback Submitted"
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
            if (localStorage.getItem('logged') === "false") {
                Swal.fire({
                    timer: 1000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        window.location.replace('login.html');
                    }
                });
            }
        });
    }, [open]);

    return (
        <button className="chat" id="ii">
            <div className="chatter" id="innerii">
                <div className="above" style={{ position: "relative" }}>
                    <img src={logo} alt="Symbios Logo" width="50px" />
                    <div>
                        <i className="fa-solid fa-ellipsis" id="+"></i>
                        <i className="fa-solid fa-minus" id="-"></i>
                    </div>
                    <ul id="u">
                        <li>Visit My Github Account</li>
                        <li>Add messenger to your Website</li>
                    </ul>
                </div>
                <h1>Chat with Symbios.pk</h1>
                <p id="chatBtn">Start Chat</p>
                <i className="fa-brands fa-facebook-messenger"></i> Powered By Messenger
            </div>
            <i class="fa-solid fa-message" id='iii'></i>
        </button>
    );
}

export default Chat;
