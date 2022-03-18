import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Modal from "../../components/Modal";
import Title from "../../components/Title";
import firebase from "../../services/firebaseConnection";
import "./dashboard.css";

const listRef = firebase
  .firestore()
  .collection("chamados")
  .orderBy("created", "desc");

function Dashboard() {
  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [lastDocs, setLastDocs] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

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
          createdFormatted: format(data.created.toDate(), "dd/MM/yyyy"),
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

  async function handleMore() {
    setLoadingMore(true);
    listRef
      .startAfter(lastDocs)
      .limit(5)
      .get()
      .then((snapshot) => {
        updateState(snapshot);
      })
      .catch((err) => {
        console.log(err);
        setLoadingMore(false);
      });
  }

  useEffect(() => {
    async function loadChamados() {
      listRef
        .limit(5)
        .get()
        .then((snapshot) => {
          updateState(snapshot);

          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingMore(false);
          setLoading(false);
        });
    }

    loadChamados();
    return () => {};
  }, []);

  function togglePostModal(item) {
    setShowPostModal((showPostModal) => !showPostModal);
    setDetail(item);
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container dashboard">
            <span>Buscando Chamados...</span>
          </div>
        </div>
      </div>
    );
  }
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
                {chamados.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td data-label="Cliente">{item.cliente}</td>
                      <td data-label="Assunto">{item.assunto}</td>
                      <td data-label="Status">
                        <span
                          className="badge"
                          style={{
                            backgroundColor:
                              item.status === "Aberto" ? "#5cb85c" : "#999",
                          }}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormatted}</td>
                      <td data-label="#">
                        <button
                          className="action"
                          onClick={() => togglePostModal(item)}
                          style={{ backgroundColor: "#3583f6" }}
                        >
                          <FiSearch color="#FFF" size={17} />{" "}
                        </button>
                        <Link
                          to={`/new/${item.id}`}
                          className="action"
                          style={{ backgroundColor: "#f6a935" }}
                        >
                          <FiEdit2 color="#FFF" size={17} />{" "}
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {loadingMore && (
              <h3 style={{ textAlign: "center", marginTop: 15 }}>
                Buscando dados...
              </h3>
            )}
            {!loadingMore && !isEmpty && (
              <button className="btn-more" onClick={handleMore}>
                Buscar mais
              </button>
            )}
          </>
        )}
      </div>

      {showPostModal && <Modal conteudo={detail} close={togglePostModal} />}
    </div>
  );
}

export default Dashboard;
