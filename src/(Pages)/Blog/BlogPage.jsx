import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./BlogPage.css";
import { InfoContext } from "../../Context/InfoContext";
import baseAxios, { METHOD_HTTP } from "../../baseAxios/BaseAxios";

const BlogPage = () => {
  const { user, getInfo } = useContext(InfoContext);
  const [blog, setBlog] = useState([]);
  const [likes, setLikes] = useState({});
  const [postImageUrl, setPostImageUrl] = useState(""); // State cho URL ảnh bài viết

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const getBlog = async () => {
      try {
        const data = await baseAxios(METHOD_HTTP.GET, "/posts");
        setBlog(data);

        // Lấy lượt like cho từng bài viết
        await Promise.all(data.map((post) => getLike(post.id)));
      } catch (error) {
        console.log(error);
      }
    };
    getBlog();
    getInfo();
  }, []);

  const getLike = async (id) => {
    try {
      const data = await baseAxios(METHOD_HTTP.GET, `/posts/${id}/likes`);
      const likeCount = data.length;

      setLikes((prevLikes) => ({
        ...prevLikes,
        [id]: likeCount,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = async (id) => {
    try {
      const response = await baseAxios(METHOD_HTTP.POST, `/posts/${id}/like`);
      console.log(response);

      if (response?.data?.success) {
        await getLike(id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Hàm tạo bài viết mới
  const createPost = async (formData) => {
    // const postData = {
    //   content: formData.content,
    //   userId: user ? user.id : null,
    //   image: postImageUrl || null, // Thêm URL ảnh vào dữ liệu bài viết
    // };

    try {
      const data = await baseAxios(METHOD_HTTP.POST, "/posts", formData);

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-content">
      <div className="blog-container">
        <div className="blog-top-container">
          <div className="avatar flex space-x-4 pb-2 ">
            <img
              src={user ? user.image : "https://picsum.photos/200"}
              alt=""
              className="rounded-full w-12 h-12"
            />
            <form onSubmit={handleSubmit(createPost)} className="w-full">
              <input
                type="text"
                placeholder="What's on your mind?"
                className="w-full bg-black/10 p-2 rounded-lg"
                {...register("content", {
                  required: "Nội dung không được để trống",
                })}
              />
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Enter image URL"
                  value={postImageUrl}
                  onChange={(e) => setPostImageUrl(e.target.value)} // Lưu URL ảnh từ input
                />
              </div>
              <button type="submit" className="mt-2">
                Post
              </button>
            </form>
          </div>
        </div>

        {blog.map((post) => (
          <div className="content-blog mt-4" key={post.id}>
            <div className="content-top-blog flex justify-between items-center">
              <div className="left flex items-center space-x-2">
                <img
                  src={user.image || "https://picsum.photos/200"}
                  alt=""
                  className="rounded-full w-12 h-12"
                />
                <span>{post.username || "Nguyen Van A"}</span>
                <span>{post.createAt}</span>
              </div>

              <div className="right flex items-center">
                <span className="icon-edit cursor-pointer">✎</span>
                <span className="ml-2 cursor-pointer text-red-500">X</span>
              </div>
            </div>

            <div className="content-bottom-blog">
              <div className="content-or-image">
                <p>{post.content || "Lorem ipsum dolor sit amet."}</p>
                {post.image && (
                  <img
                    src={post.image}
                    className="w-full object-cover"
                    alt=""
                  />
                )}
              </div>
              <div>
                <p>{likes[post.id] || 0} Likes</p>
              </div>
              <div className="icon-like">
                <span
                  className="cursor-pointer"
                  onClick={() => likePost(post.id)}
                >
                  👍
                </span>
                <span className="cursor-pointer">👎</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
