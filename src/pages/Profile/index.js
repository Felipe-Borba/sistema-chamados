import React, { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import avatar from "../../assets/avatar.png";
import "./profile.css";

function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile">
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" />
              <img
                src={avatarUrl || avatar}
                width="250"
                height="250"
                alt="Foto de perfil do usuário"
              />
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={({ target }) => setNome(target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled />

            <button type="submit">Salvar</button>
          </form>
        </div>

        <div className="container">
          <button className="logout-btn" onClick={signOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
