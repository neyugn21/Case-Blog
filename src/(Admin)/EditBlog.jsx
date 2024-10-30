import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import baseAxios, { METHOD_HTTP } from "../baseAxios/BaseAxios";

const EditBlog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const nav = useNavigate();
  const { id } = useParams();

  // Lấy thông tin bài viết để chỉnh sửa
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await baseAxios(METHOD_HTTP.GET, `/posts/${id}`);
        reset(data);
      } catch (error) {
        console.error("Error fetching the post:", error);
      }
    };
    fetchData();
  }, [id, reset]);

  // Xử lý khi gửi form
  const onSubmit = async (formEdit) => {
    try {
      await baseAxios(METHOD_HTTP.PUT, `/posts/${id}`, formEdit);
      alert("Update blog success");
      nav("/admin/blog");
    } catch (error) {
      console.error("Error updating the post:", error);
    }
  };

  return (
    <div className="edit-blog">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            className="form-control"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            placeholder="Content"
            className="form-control"
            {...register("content", { required: "Content is required" })}
          />
          {errors.content && (
            <p className="text-red-500">{errors.content.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="image" className="form-label">
            Image URL
          </label>
          <input
            type="text"
            placeholder="Image URL"
            className="form-control"
            {...register("image", { required: "Image URL is required" })}
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <button type="submit" className="btn">
          Edit
        </button>
      </form>
    </div>
  );
};

export default EditBlog;
