import { useState } from "react";
import Nav from "../Nav/index";
import { useSelector } from "react-redux";
import * as client from "./client";
import { useNavigate } from "react-router-dom";
import HeaderLogo from "../Home/HeaderLogo";

export default function CreatePost() {
    const { currentUser } = useSelector((state: any) => state.userReducer);
    const [destinationCity, setDestinationCity] = useState("");
    const [destinationCountry, setDestinationCountry] = useState("");
    const [caption, setCaption] = useState("");
    const [fileData, setFileData] = useState<ArrayBuffer | null>(null);
    const [hasSelectedFile, setHasSelectedFile] = useState(false);
    const navigate = useNavigate();
    const handleFileChange = (file: any) => {
        if (!file || file.size <= 0 || file.type !== "image/png") {
            setHasSelectedFile(false);
            alert("Please select a valid .png file to upload!");
            return;
        }

        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            setFileData(fileReader.result as ArrayBuffer);
            setHasSelectedFile(true);
        }
        fileReader.readAsArrayBuffer(file);
    };
    const submitPost = async () => {
        if (destinationCountry === "") {
            alert("Please enter the country that you visited!");
            return;
        }
        if (destinationCity === "") {
            alert("Please enter the city that you visited!");
            return;
        }
        if (caption === "") {
            alert("Please enter a caption for your post!");
            return;
        }
        if (!hasSelectedFile) {
            alert("Please select an image to attach to your post!");
            return;
        }

        const byteArray = new Uint8Array(fileData as ArrayBuffer);
        let binary = "";
        for (let i = 0; i < byteArray.byteLength; i++) {
            binary += String.fromCharCode(byteArray[i]);
        }

        const newPost = {
            user: currentUser._id,
            poster: currentUser.username,
            photo: btoa(binary),
            destinationCity: destinationCity,
            destinationCountry: destinationCountry,
            caption: caption,
        }
        await client.createNewPost(newPost);
        navigate("/profile");
    }
    return (
        <div>
            <Nav />
            <HeaderLogo />
            <div className="post-list">
                <div className="card post-card p-4">
                    <h1>Create New Post</h1>
                    <form >
                        <label className="form-label me-2" htmlFor="destinationCity">Destination City:</label>
                        <input className="border px-4 py-2 rounded mb-2" id="destinationCity" type="text" onChange={((e) => setDestinationCity(e.target.value))}
                        />
                        <br />
                        <label className="form-label me-2" htmlFor="destinationCountry">Destination Country:</label>
                        <input className="border px-4 py-2 rounded" id="destinationCountry" type="text" onChange={((e) => setDestinationCountry(e.target.value))}
                        />
                        <br />
                        <label className="form-label" htmlFor="caption">Caption:</label>
                        <textarea className="form-control" id="caption" rows={10} onChange={((e) => setCaption(e.target.value))}
                        />
                        <br />
                        <label htmlFor="picture">Show us a picture from your trip!:</label>
                        <input
                            accept="image/png"
                            onChange={(event: any) => handleFileChange(event.target.files[0])}
                            type="file"
                        />
                    </form>

                    <div>
                        <button className="btn btn-primary float-end" onClick={submitPost}>Submit</button>
                    </div>

                </div>
            </div>
        </div>
    )
}