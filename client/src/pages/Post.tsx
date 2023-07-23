import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Post = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
    const navigate = useNavigate()

    const checkfile = (e:any) => {
        setFile(e.target.files[0]);
        console.log(file)
    }

  const handlePost = async (e:any) => {
    e.preventDefault();

    try {
        const formData = new FormData();
        if(file) formData.append('file',file);
        formData.append('name',name);
        formData.append('author',author);
        formData.append('description',desc);

        const {data} = await axios.post('http://localhost:8800/',formData);
        // console.log(data)
        // console.log(formData)
        if(data){
            navigate('/')
        }

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <div className="bg-slate-700 p-6 min-h-screen">
        <form className="  bg-slate-700 p-2">
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Book Name
            </label>
            <input
              type="text"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Book name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Author Name
            </label>
            <input
              type="text"
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Author name"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description of Post
          </label>
          <textarea
            id="message"
            rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="Leave a description..."
            value={desc}
            
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            onChange={checkfile}
            // onChange={(e) => setFile(e.target.files[0])}
          />
          <div
            className="mt-1 text-sm text-gray-500 dark:text-gray-300 mb-5"
            id="user_avatar_help"
          >
            A profile picture is useful to confirm your are logged into your
            account
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handlePost}
          >
            Upload new post
          </button>
        </form>
      </div>
    </>
  );
};

export default Post;
