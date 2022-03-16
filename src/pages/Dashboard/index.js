import React, { useContext, useState } from "react";
import { FiMessageSquare, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { AuthContext } from "../../contexts/auth";
import "./dashboard.css";

function Dashboard() {
  const { signOut } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);

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
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
