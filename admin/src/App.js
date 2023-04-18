import React, { useState } from "react";
import TextEditor from "./component/TextEditor";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [author, setAuthor] = useState("");
  const [img, setImg] = useState(null);
  const [secretKey, setSecretKey] = useState("");
  const [pass, setPass] = useState(false);
  const [imageSrc, setImageSrc] = useState();

  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);

    setImg(changeEvent.target.files[0]);
  }

  async function createPostHandler() {
    try {
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "rijoqnuu");
      data.append("cloud_name", "dcnm2ql9y");

      alert("uploading image.....");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dcnm2ql9y/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const res2 = await res.json();
      console.log(res2);
      if (res2.error) {
        console.log("something went wrong");
      } else {
        let x = res2.url;
        const data = {
          picture: x,
          author: author,
          content: value,
        };
        await axios
          .post("http://localhost:3001/admin/createpost", data, {
            withCredentials: true,
          })
          .then(() => {
            alert("image upload successfully");
            alert("successfully created post");
            setImageSrc("");
          })
          .catch((err) => console.log(err));
      }
    } catch (err) {
      console.log(err);
    }
  }

  const passHandler = (e) => {
    e.preventDefault();
    if (secretKey === "12345abcde") {
      setPass(true);
    }
  };

  return (
    <>
      {pass ? (
        <>
          <div className="flex justify-center items-center flex-col gap-4 ">
            <div className="w-[75%]">
              <div className="photos">
                <input
                  type="file"
                  name="postImg"
                  id="postimg-input"
                  onChange={handleOnChange}
                />
              </div>
              {imageSrc && (
                <>
                  <img src={imageSrc} alt="createpost" />
                </>
              )}
              <div className="author">
                <input
                  type="text"
                  placeholder="author....."
                  className="p-4 w-full"
                  onChange={(e) => {
                    setAuthor(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <TextEditor setValue={setValue} />
            <div>
              <button
                className="py-2 px-4 bg-blue-300 rounded-md hover:bg-blue-500"
                onClick={createPostHandler}
              >
                Create
              </button>
            </div>
          </div>
          <hr className="border border-black my-3 " />
          <hr className="border border-black my-3 " />
        </>
      ) : (
        <>
          <div>
            <input
              placeholder="Enter secret key...."
              onChange={(e) => {
                setSecretKey(e.target.value);
              }}
            />
            <button className="px-4 py-1 bg-purple-800" onClick={passHandler}>
              Go
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default App;
