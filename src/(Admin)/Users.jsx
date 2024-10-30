import React, { useContext, useEffect, useState } from "react";
import { InfoContext } from "../Context/InfoContext";
import baseAxios, { METHOD_HTTP } from "../baseAxios/BaseAxios";

const Users = () => {
  const { user, getInfo } = useContext(InfoContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    getInfo();
  }, []);

  useEffect(() => {
    setEditedUser(user); // Cập nhật thông tin khi user thay đổi
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      await baseAxios(METHOD_HTTP.PUT, "/users/update-profile", editedUser);
      setIsEditing(false);
      console.log("User updated successfully");
      getInfo(); // Cập nhật lại thông tin người dùng
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedUser(user); // Reset lại nếu hủy bỏ
  };

  if (!user) {
    return <div>Loading user information...</div>;
  }

  return (
    <div className="container">
      <table className="table">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Date of birth</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {isEditing ? (
                <input type="text" name="username" />
              ) : (
                user.username
              )}
            </td>
            <td>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={editedUser.dob}
                  onChange={handleInputChange}
                />
              ) : (
                user.dob
              )}
            </td>
            <td>
              {isEditing ? (
                <input
                  type="text"
                  name="image"
                  value={editedUser.image}
                  onChange={handleInputChange}
                />
              ) : (
                <img src={user.image} width={"100px"} alt="User profile" />
              )}
            </td>
            <td>
              {isEditing ? (
                <>
                  <button className="btn btn-success" onClick={handleSaveClick}>
                    Save
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button className="btn btn-warning" onClick={handleEditClick}>
                  Edit
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
