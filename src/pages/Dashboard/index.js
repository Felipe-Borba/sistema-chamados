import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import firebase from "../../services/firebaseConnection";
import "./dashboard.css";

const listRef = firebase
  .firestore()
  .collection("chamados")
  .orderBy("created", "desc");

function Dashboard() {
  const [chamados, setChamados] = useState([1]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [lastDocs, setLastDocs] = useState();

  function updateState(snapshot) {
    const isEmpty = snapshot.size === 0;
    if (!isEmpty) {
      const list = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        list.push({
          id: doc.id,
          assunto: data.assunto,
          cliente: data.cliente,
          clienteId: data.clienteId,
          created: data.created,
          createdFormatted: format(data.created.toDate(), "dd/mm/yyyy"),
          status: data.status,
          complemento: data.complemento,
        });
      });

      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastDocs(lastDoc);
      setChamados((chamados) => [...chamados, ...list]);
      setIsEmpty(false);
    } else {
      setIsEmpty(true);
    }

    setLoadingMore(false);
  }

  async function loadChamados() {
    listRef
      .limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);

        setLoadingMore(false);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoadingMore(false);
        setLoading(false);
      });
  }

  useEffect(() => {
    loadChamados();
    return () => {};
  }, []);

  return (
    <div>
      <Header />
      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {chamados.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>
            <Link className="new" to="/new">
              <FiPlus size={25} color="#FFF" />
              Novo Chamado
            </Link>
          </div>
        ) : (
          <>
            <Link className="new" to="/new">
              <FiPlus size={25} color="#FFF" />
              Novo Chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Cliente">Cliente</td>
                  <td data-label="Assunto">Assunto</td>
                  <td data-label="Status">
                    <span
                      className="badge"
                      style={{ backgroundColor: "#5cb85c" }}
                    >
                      Em aberto
                    </span>
                  </td>
                  <td data-label="Cadastrado">Cadastrado</td>
                  <td data-label="#">
                    <button
                      className="action"
                      style={{ backgroundColor: "#3583f6" }}
                    >
                      <FiSearch color="#FFF" size={17} />{" "}
                    </button>
                    <button
                      className="action"
                      style={{ backgroundColor: "#f6a935" }}
                    >
                      <FiEdit2 color="#FFF" size={17} />{" "}
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
