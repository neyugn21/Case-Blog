import React, { useState, useEffect, useContext } from "react";
import baseAxios, { METHOD_HTTP } from "../baseAxios/BaseAxios";
import { InfoContext } from "../Context/InfoContext";
import { Link } from "react-router-dom";

const Blog = () => {
  const { user, getInfo } = useContext(InfoContext);
  const [blog, setBlog] = useState([]);
  const [likes, setLikes] = useState({});
  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await baseAxios(METHOD_HTTP.GET, "/posts");
        setBlog(data);
        console.log(data.id);

        // Lấy lượt like cho từng bài viết
        await data.map((post) => getLike(post.id));
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
    // getInfo();
  }, []);

  const handleDelete = async (id) => {
    try {
      const isConfirm = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!isConfirm) return;
      await baseAxios(METHOD_HTTP.DELETE, `/posts/${id}`);
      setBlog((prevBlog) => prevBlog.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getLike = async (id) => {
    try {
      const data = await baseAxios(METHOD_HTTP.GET, `/posts/${id}/likes`);

      const likeCount = data.length; // Đếm số lượt like

      setLikes((prevLikes) => ({
        ...prevLikes,
        [id]: likeCount, // Lưu số lượt like vào state
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center font-bold text-xl mb-2">Blog</h1>

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Content</th>
            <th>Image</th>
            <th>Date</th>
            <th>Username</th>
            <th>Likes</th> {/* Thêm cột cho số lượt like */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blog.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td>{post.content}</td>
              <td>
                <img src={post.image} alt="Post" width="50" />
              </td>
              <td>{post.createAt}</td>
              <td>{post.username}</td>
              <td>{likes[post.id] || 0}</td> {/* Hiển thị số lượt like */}
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(post.id)}
                >
                  Delete
                </button>
                <Link to={`/admin/edit/${post.id}`}>
                  {" "}
                  <button className="btn btn-warning">Edit</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blog;
