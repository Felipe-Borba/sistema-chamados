import React from "react";
import { FiPlus } from "react-icons/fi";
import Header from "../../components/Header";
import Title from "../../components/Title";
import "./new.css";

function New() {
  function handleRegister(e) {
    e.preventDefault();
  }

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
            <select>
              <option key={1} value={1}>
                ab1
              </option>
            </select>

            <label>Assunto</label>
            <select>
              <option value="Suporte">Suporte</option>
              <option value="Visita Técnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>

            <label>Status</label>
            <div className="status">
              <input type="radio" name="radio" value="Aberto" />{" "}
              <span>Em Aberto</span>
              <input type="radio" name="radio" value="Progresso" />{" "}
              <span>Em Progresso</span>
              <input type="radio" name="radio" value="Atendido" />{" "}
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea type="text" placeholder="Descreva seu Problema" />

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
