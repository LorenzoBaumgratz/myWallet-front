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
    axios.get(`${process.env.REACT_APP_API_URL}/transacoes`, config)
      .then(res => {
        setTransacoes(res.data.reverse())
        res.data.map(t => {(t.tipo === "entrada")?setSaldo(saldo+t.valor):setSaldo(saldo-t.valor)})

      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])
  if (!transacoes) return

  function logout(){
    localStorage.removeItem("usuario")
    navigate("/")
  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {usuario.nome}</h1>
        <BiExit onClick={()=>logout()}/>
      </Header>

      <TransactionsContainer>
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
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo > 0 ? "positivo" : "negativo"}>
          {(saldo/100).toFixed(2)}
          </Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

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
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
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
    height: 115px;
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