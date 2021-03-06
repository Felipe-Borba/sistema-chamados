import React, { useContext, useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import firebase from "../../services/firebaseConnection";
import "./new.css";

function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();

  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");
  const [complemento, setComplemento] = useState("");
  const [customers, setCustomers] = useState([]);
  const [loadCustomers, setLoadCustomers] = useState(true);
  const [customerSelected, setCustomerSelected] = useState(0);

  const [idCustomer, setIdCustomer] = useState(false);

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

    if (idCustomer) {
      await firebase
        .firestore()
        .collection("chamados")
        .doc(id)
        .update({
          cliente: customers[customerSelected].nome,
          clienteId: customers[customerSelected].id,
          assunto,
          status,
          complemento,
          userId: user.uid,
        })
        .then(() => {
          toast.success("chamado atualizado com sucesso.");
          setCustomerSelected(0);
          setComplemento("");
          history.push("/dashboard");
        })
        .catch((err) => {
          console.log(err);
        });
      return;
    }

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
        setComplemento("");
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function loadId(list) {
    firebase
      .firestore()
      .collection("chamados")
      .doc(id)
      .get()
      .then((snapshot) => {
        const { assunto, status, complemento, clienteId } = snapshot.data();
        setComplemento(complemento);
        setAssunto(assunto);
        setStatus(status);

        const index = list.findIndex((item) => item.id === clienteId);
        setCustomerSelected(index);
        setIdCustomer(true);
      })
      .catch((err) => {
        console.log(err);
        setIdCustomer(false);
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

          if (id) {
            loadId(list);
          }
        })
        .catch((err) => {
          console.log(err);
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
              <option value="Visita T??cnica">Visita T??cnica</option>
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

            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
