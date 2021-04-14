import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

import "../styling/blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blogurl = `https://gnews.io/api/v4/search?q=${searchInput}&token=db2f2e34a75181e7df3983273dfab93a`;
  
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
    //eslint-disable-next-line
      .get(blogurl) 
      .then((response) => {
        //eslint-disable-next-line
        dispatch(setBlogData(response.data)); 
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  },
  //eslint-disable-next-line
   [searchInput]);
  return (
    <div className="blog__page">
      <h1 className="blog__page__header">BLOGS</h1>
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" rel="noreferrer" href={blog.url} >
            <img src={blog.image} alt="done"/>
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}

        {blogs?.totalArticles === 0 && (
          <h1 className="no__blogs">
            No blogs available. Search something else to read blogs on the
            greatest platform.
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;