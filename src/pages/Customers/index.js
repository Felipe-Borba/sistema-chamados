import React, { useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import firebase from "../../services/firebaseConnection";
import "./customers.css";

function Customers() {
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");

  async function handleAdd(e) {
    e.preventDefault();

    if (nomeFantasia !== "" && cnpj !== "" && endereco !== "") {
      firebase
        .firestore()
        .collection("customers")
        .add({
          nomeFantasia,
          cnpj,
          endereco,
        })
        .then(() => {
          setNomeFantasia("");
          setCnpj("");
          setEndereco("");
          toast.info("Empresa cadastrada com sucesso!");
        })
        .catch((err) => {
          toast.error(err);
        });
    } else {
      toast.error("Preencha todos os Campos");
    }
  }

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile customers" onSubmit={handleAdd}>
            <label>Nome Fantasia</label>
            <input
              type="text"
              value={nomeFantasia}
              onChange={({ target }) => setNomeFantasia(target.value)}
            />

            <label>CNPJ</label>
            <input
              type="text"
              value={cnpj}
              onChange={({ target }) => setCnpj(target.value)}
            />

            <label>Endereço</label>
            <input
              type="text"
              value={endereco}
              onChange={({ target }) => setEndereco(target.value)}
            />

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Customers;
