import { useAuth } from "../Auth/AuthContext";
import { useState } from "react";
import { createPost } from "./client";

const Feed = () => {
  const auth = useAuth();

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [caption, setCaption] = useState("");

  const [fileData, setFileData] = useState<ArrayBuffer | null>(null);
  const [hasSelectedFile, setHasSelectedFile] = useState(false);

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

  const handleUpload = () => {
    if (country === "") {
      alert("Please enter the country that you visited!");

      return;
    }
    if (city === "") {
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
      user: auth.user?._id,
      poster: auth.user?.username,
      photo: btoa(binary),
      caption: caption,
      destinationCity: city,
      destinationCountry: country,
      views: 0,
      likes: 0
    };

    createPost(newPost);

    alert("Your post has been created!");

    setCountry("");
    setCity("");
    setCaption("");

    setHasSelectedFile(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl">Welcome to the Feed, {auth.user?.username}!</h1>
      <button
        onClick={() => auth.signOut()}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Sign Out
      </button>
      <br />
      <br />
      <br />
      Which country did you visit? <input
        onChange={(event) => setCountry(event.target.value)}
        placeholder="Country"
        value={country}
      />
      <br />
      Which city did you visit? <input
        onChange={(event) => setCity(event.target.value)}
        placeholder="City"
        value={city}
      />
      <br />
      How was your trip? <textarea
        onChange={(event) => setCaption(event.target.value)}
        placeholder="Caption"
        value={caption}
      />
      <br />
      Show us a picture from your trip! <input
        accept="image/png"
        onChange={(event: any) => handleFileChange(event.target.files[0])}
        type="file"
      />
      <br />
      <br />
      <br />
      <button
        onClick={handleUpload}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create Post
      </button>
    </div>
  );
};

export default Feed;
