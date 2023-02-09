import { auth } from "fBase";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();
  const onLogOutClick = () => {
    auth.signOut();
    nav("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Logout</button>
    </>
  );
};

export default Profile;
