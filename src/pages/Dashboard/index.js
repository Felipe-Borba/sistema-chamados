import React, { useContext, useState } from "react";
import { FiEdit2, FiMessageSquare, FiPlus, FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import "./dashboard.css";

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  const [chamados, setChamados] = useState([1]);

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
