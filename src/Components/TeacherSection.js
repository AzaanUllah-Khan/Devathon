import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Swal from 'sweetalert2'
import { collection, addDoc, onAuthStateChanged, auth, db, doc, getDoc,onSnapshot } from '../Firebase/config'
import { useNavigate } from 'react-router-dom'

function TeacherSection() {
    const navigate = useNavigate()
    function student() {
        navigate("/main")
    }
    function send() {

        var username;
        var uid;
        var coursename = document.getElementById("name").value
        var Subject = document.getElementById("category").value
        var exp = document.getElementById("experience").value
        var level = document.getElementById("level").value
        var course = document.getElementById("course").value
        onAuthStateChanged(auth, async (user) => {
            const docRef = doc(db, "user", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                console.log("Document data:", docSnap.data());
                if (user) {
                    uid = user.uid;
                    try {
                        const docRef = await addDoc(collection(db, "Courses"), {
                            course: coursename,
                            Subject,
                            experience: exp,
                            level,
                            teacherId: uid,
                            teacher: docSnap.data().name,
                            desc: course
                        });
                        console.log("Document written with ID: ", docRef.id);
                        Swal.fire({
                            icon: "success",
                            text: "Course Added Successfully",
                            title: "Success"
                        }).then(()=>{
                            window.location.replace("./main")
                        })
                    } catch (e) {
                        console.error("Error adding document: ", e);
                    }
                } else {
                    Swal.fire({
                        icon: "error",
                        text: "error adding the course",
                        title: "Try Again"
                    })
                }
            }
            else {
                window.location.href = '/'
            }
        });
    }



    return (
        <>
            <Navbar navbaritem={"Switch To Student"} navbaritemfunction={student} />
            <div className="body">
                <div className="form-outer">
                    <h1>Add A Course</h1>
                    <div className="form-inner">
                        <div className="input">
                            <label htmlFor="name">Course Name</label>
                            <input type="text" name="name" id="name" />
                        </div>
                        <div className="input">
                            <label htmlFor="category">Subject</label>
                            <select id="category">
                                <option value="Maths">Maths</option>
                                <option value="English">English</option>
                                <option value="Science">Science</option>
                                <option value="Islamic">Islamic</option>
                            </select>
                        </div>
                        <div className="input">
                            <label htmlFor="email">Description Of Course</label>
                            <input type="text" name="course" id="course" />
                        </div>
                        <div className="input">
                            <label htmlFor="password">Experience In Teaching</label>
                            <select id="experience">
                                <option value="1+ years">1+ Years</option>
                                <option value="2+ years">2+ Years</option>
                                <option value="3+ years">3+ Years</option>
                            </select>
                        </div>
                        <div className="input">
                            <label htmlFor="country">Level</label>
                            <select id="level">
                                <option value="Beginner">Beginner</option>
                                <option value="INtermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={send}>Add +</button>
                </div>
            </div>
        </>
    )
}

export default TeacherSection