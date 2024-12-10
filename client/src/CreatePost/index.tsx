import React, { useState } from "react";
import Nav from "../Nav/index";
import { useSelector } from "react-redux";
import * as client from "./client";
import { current } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [destinationCity, setDestinationCity] = useState("");
    const [destinationCountry, setDestinationCountry] = useState("");
    const [caption, setCaption] = useState("");
    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const submitPost = async () => {
        const newPost = {
            user: currentUser._id,
            poster: currentUser.username,
            destinationCity: destinationCity,
            destinationCountry: destinationCountry,
            caption: caption
        }
        await client.createNewPost(newPost);
        navigate("/profile");
    }
    return (
        <div>
            <Nav />
            <h1>Create New Post</h1>
            <form >
                <label htmlFor="destinationCity">Destination City:</label>
                <input id="destinationCity" type="text"
                    onChange={((e) => setDestinationCity(e.target.value))}
                />
                <br />

                <label htmlFor="destinationCountry">Destination Country:</label>
                <input id="destinationCountry" type="text"
                    onChange={((e) => setDestinationCountry(e.target.value))}
                />
                <br />

                <label htmlFor="caption">Caption:</label>
                <textarea id="caption"
                    onChange={((e) => setCaption(e.target.value))}
                />
                <br />
            </form>
            <button onClick={submitPost}>Submit</button>
        </div>
    )
}