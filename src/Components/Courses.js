import { collection, onSnapshot, db } from '../Firebase/config';
import React, { useState, useEffect } from 'react';
const Courses = () => {
    const [data, setData] = useState([]);
    const [img, setImg] = useState("");

    useEffect(() => {
        const q = collection(db, "Courses");
        const unsubscribe = onSnapshot(q, (snapshot) => {
            // Clear the data array
            setData([]);

            snapshot.docChanges().forEach((change) => {
                console.log(change.doc.data());
                // Use the functional update to ensure you work with the latest state
                setData((prevData) => [...prevData, change.doc.data()]);
            });
        });

        return () => unsubscribe();
    }, []);

    console.log(data);

    // Set the image based on the subject outside of the data.map loop
    const getImage = (subject) => {
        if (subject === "Maths") {
            return "https://img.freepik.com/premium-vector/doodle-math-formula-with-mathematics-font_1639-26838.jpg";
        } else if (subject === "Islamic") {
            return "https://i.pinimg.com/600x315/19/ed/d0/19edd049d5bf267a019aeafeecf5c2d9.jpg";
        } else if (subject === "Science") {
            return "https://i.pinimg.com/736x/93/d2/b6/93d2b668cd5953c68dcd2e4d8be3f9ae.jpg";
        } else if (subject === "English") {
            return "https://cdn4.vectorstock.com/i/1000x1000/62/58/cover-for-a-school-notebook-or-english-textbook-vector-31886258.jpg";
        }
        return ""; // Default image if subject is not recognized
    };

    return (
        <>
            <section className="course">
                <div className="title-text">
                    <p>Courses</p>
                    <h1>We Provide</h1>
                </div>
                <div className="wrapper">
                    {data.map((item) => (
                        <div className="product-card" key={item.course}>
                            <a className="product-card__image" href="https://aharito.ru" target="_blank">
                                <img src={getImage(item.Subject)} alt="Product List Card UI" className="cover-img" />
                            </a>
                            <div className="product-card__body">
                                <a className="product-card__title" href="https://aharito.ru">{item.course}</a>
                                <div className="product-card__desc">{item.desc}</div>
                                <div className="product-card__stock">{item.teacher}</div>
                                <div className="product-card__price price">
                                    <span className="price__current">{item.Subject}</span>
                                </div>
                                <div className="product-card__labels">
                                    <span className="label label_hit">{item.experience}</span>
                                    <span className="label label_sale">{item.level}</span>
                                </div>
                            </div>
                            <div className="product-card__btn">
                                <button className="btn btn_product" type="button">Enroll Now</button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Courses;