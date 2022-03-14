import React, { useContext, useState } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import avatar from "../../assets/avatar.png";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import "./profile.css";

function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [nome, setNome] = useState(user && user.nome);
  const [email] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  async function handleSave(e) {
    e.preventDefault();

    if (imageAvatar === null && nome !== "") {
      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({ nome })
        .then(() => {
          const data = { ...user, nome };
          setUser(data);
          storageUser(data);
        });
    } else if (nome !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  function handleUpload() {
    firebase
      .storage()
      .ref(`images/${user.uid}/${imageAvatar.name}`)
      .put(imageAvatar)
      .then(() => {
        firebase
          .storage()
          .ref(`images/${user.uid}`)
          .child(imageAvatar.name)
          .getDownloadURL()
          .then((avatarUrl) => {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .update({ nome, avatarUrl: avatarUrl })
              .then(() => {
                const data = { ...user, nome, avatarUrl: avatarUrl };
                setUser(data);
                storageUser(data);
              });
          });
      });
  }

  function handleFile(e) {
    const image = e.target.files[0];
    if (image) {
      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        alert("Envie uma imagem do tipo PNG ou JPEG");
        setImageAvatar(null);
        setAvatarUrl(URL.createObjectURL(null));
      }
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Meu perfil">
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSave}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#FFF" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
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
