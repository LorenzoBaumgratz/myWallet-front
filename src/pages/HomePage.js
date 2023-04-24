import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useLogin } from "../contexts/context"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const navigate = useNavigate();
  const { usuario } = useLogin()
  const [transacoes, setTransacoes] = useState()
  const [saldo, setSaldo] = useState(0)


  const config = {
    headers: {
      "Authorization": `Bearer ${usuario.token}`
    }
  }
  useEffect(() => {
    let total = 0;
    axios.get(`${process.env.REACT_APP_API_URL}/transacoes`, config)
      .then(res => {
        setTransacoes(res.data.reverse())
        const entrada = res.data.filter(t => t.tipo === "entrada")
        const saida = res.data.filter(t => t.tipo === "saida")
        entrada.map(e => {
          total = (e.valor / 100) + total
        })
        saida.map(s => {
          total = total - (s.valor / 100)
        })
        setSaldo(total)
      })

      .catch(err => {
        alert(err.response.data)
      })

  }, [])
  if (!transacoes) return

  function logout() {
    localStorage.removeItem("usuario")
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {usuario.nome}</h1>
        <BiExit onClick={() => logout()} />
      </Header>

      <TransactionsContainer>
        {transacoes.length === 0 ? <Mensagem>Não há registros de entrada ou saida</Mensagem> :
          <ul>
            {transacoes.map((i) =>
              <ListItemContainer>
                <div>
                  <span>{i.data}</span>
                  <strong>{i.descricao}</strong>
                </div>
                <Value color={i.tipo === "entrada" ? "positivo" : "negativo"}>{(i.valor / 100).toFixed(2)}</Value>
              </ListItemContainer>
            )}
          </ul>}


        <article>
          <strong>Saldo</strong>
          <Value color={saldo >= 0 ? "positivo" : "negativo"}>
            {saldo.toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const Mensagem = styled.div`
  display: flex;
  justify-content: center;
  align-items:center;
  text-align: center;
  font-size: 20px;
  width: 180px;
  margin: 50% 20%;
`

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  height: 446px;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 13px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ul{
    overflow-y: scroll;
  }
  article {
    display: flex;
    justify-content: space-between;
    margin-right  :10px ;
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 100px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`