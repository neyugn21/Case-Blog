import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import baseAxios, { METHOD_HTTP } from "../../baseAxios/BaseAxios";
import { InfoContext } from "../../Context/InfoContext";

const UserPage = () => {
  const [blog, setBlog] = useState([]);
  const [likes, setLikes] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user, getInfo } = useContext(InfoContext);
  const getBlog = async () => {
    try {
      const data = await baseAxios(METHOD_HTTP.GET, "/posts");

      // Lọc bài viết theo username của người dùng hiện tại
      const userPosts = data.filter((post) => post.username === user.username);
      setBlog(userPosts);

      // Lấy lượt like cho từng bài viết của người dùng
      await Promise.all(userPosts.map((post) => getLike(post.id)));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlog();
    getInfo();
  }, [user.username]);

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

  const onSubmit = async (formData) => {
    try {
      await baseAxios(METHOD_HTTP.POST, "/posts", formData);
      // Gọi lại để cập nhật danh sách bài viết sau khi đăng thành công
      await getBlog();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main-content">
      <div className="profile-body">
        <div className="top flex space-x-3 items-center justify-between">
          <div className="flex space-x-3 items-center">
            <div className="img-pro">
              <img
                src={user ? user.image : undefined}
                className="w-[100px] rounded-full"
                alt="User Avatar"
              />
            </div>
            <div className="info-name">
              <p className="font-bold text-3xl">{user?.username}</p>
            </div>
          </div>
          <div>
            <button className="btn">Cập nhật thông tin</button>
          </div>
        </div>

        {/* Form tạo bài viết mới */}
        <div className="blog-top-container mt-4">
          <div className="avatar flex space-x-4 pb-2">
            <img
              src="https://picsum.photos/200"
              alt=""
              className="rounded-full w-12 h-12"
            />
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <input
                type="text"
                {...register("content", { required: true })}
                placeholder="What's on your mind?"
                className="w-full bg-black/10 p-2 rounded-lg"
              />
              <div className="mt-2">
                <input
                  type="text"
                  {...register("imageUrl")}
                  placeholder="Enter image URL"
                />
              </div>
              <button type="submit" className="mt-2">
                Post
              </button>
            </form>
          </div>
        </div>

        {/* Hiển thị danh sách bài viết */}
        <div className="content-blog mt-4">
          {blog.map((post) => (
            <div
              key={post.id}
              className="content-top-blog flex justify-between items-center"
            >
              <div className="left flex items-center space-x-2">
                <img
                  src={user.image || "https://picsum.photos/200"}
                  alt="Post Avatar"
                  className="rounded-full"
                />
                <span>{post.username}</span>
                <span>{new Date(post.createAt).toLocaleDateString()}</span>
              </div>
              <div className="right flex items-center">
                <span className="icon-edit cursor-pointer">✎</span>
                <span className="ml-2 cursor-pointer text-red-500">X</span>
              </div>
              <div className="content-bottom-blog">
                <div className="content-or-image w-[300px]">
                  <p>{post.content}</p>
                  {post.image && (
                    <img
                      src={post.image}
                      className="w-[500px] object-cover"
                      alt="Post Content"
                    />
                  )}
                </div>
                <div>
                  <p>{likes[post.id] || 0} Likes</p>
                </div>
                <div className="icon-like">
                  <span className="cursor-pointer">👍</span>
                  <span className="cursor-pointer">👎</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
