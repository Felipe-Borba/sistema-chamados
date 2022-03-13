import React from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiSettings } from "react-icons/fi";
import "./profile.css";

function Profile() {
  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>
      </div>
    </div>
  );
}

export default Profile;
