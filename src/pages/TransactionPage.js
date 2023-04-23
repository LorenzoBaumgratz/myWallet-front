import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components"
import { useLogin } from "../contexts/context";

export default function TransactionsPage() {
  const { usuario } = useLogin()
  const navigate = useNavigate();
  const [valor, setValor] = useState()
  const [descricao, setDescricao] = useState()
  const { tipo } = useParams();

  const config = {
    headers: {
      "Authorization": `Bearer ${usuario.token}`
    }
  }

  function enviar(e) {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/transacao`,
      {
        tipo,
        valor: Number(valor),
        descricao
      }, config)
      .then(res => {
        navigate("/home")
      })
      .catch(err => {
        alert(err.response.data)
      })
  }
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={enviar}>
        <input placeholder="Valor" type="text" onChange={(e) => setValor(e.target.value)} />
        <input placeholder="Descrição" type="text" onChange={(e) => setDescricao(e.target.value)} />
        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
