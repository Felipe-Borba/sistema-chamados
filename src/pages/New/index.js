import React, { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import "./new.css";

function New() {
  const { user } = useContext(AuthContext);

  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  function handleChangeSelect(e) {
    setAssunto(e.target.value);
  }

  function handleOptionChange(e) {
    setStatus(e.target.value);
  }

  function handleChangeCustomers(e) {
    setCustomerSelected(e.target.value);
  }

  async function handleRegister(e) {
    e.preventDefault();

    firebase
      .firestore()
      .collection("chamados")
      .add({
        created: new Date(),
        cliente: customers[customerSelected].nome,
        clienteId: customers[customerSelected].id,
        assunto,
        status,
        complemento,
        userId: user.uid,
      })
      .then(() => {
        toast.success("chamado criado com sucesso.");
        setCustomerSelected(0);
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  useEffect(() => {
    async function loadCustomers() {
      firebase
        .firestore()
        .collection("customers")
        .get()
        .then((snapshot) => {
          const list = [];

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              nome: doc.data().nomeFantasia,
            });
          });

          if (list.length === 0) {
            toast.warn("Nenhuma empresa cadastrada!");
            setCustomers([{ id: 1, nome: "" }]);
            return;
          }

          setCustomers(list);
          setLoadCustomers(false);
        })
        .catch((err) => {
          toast.error(err);
          setLoadCustomers(false);
          setCustomers([{ id: 1, nome: "" }]);
        });
    }

    loadCustomers();
  }, []);

  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Novo Chamado">
          <FiPlus size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Cliente</label>
            {loadCustomers ? (
              <input type="text" disabled value="Carregando" />
            ) : (
              <select value={customerSelected} onChange={handleChangeCustomers}>
                {customers.map((item, index) => {
                  return (
                    <option key={item.id} value={index}>
                      {item.nome}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select value={assunto} onChange={handleChangeSelect}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em Aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Em Progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu Problema (opcional)"
              value={complemento}
              onChange={({ target }) => setComplemento(target.value)}
            />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
