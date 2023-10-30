import React from "react";
import EstiloGlobal, { Container , CabecalhoImg} from "./styles";
import Cabecalho from "./components/Cabecalho";
import Cardapio from "./containers/Cardapio";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <CabecalhoImg/>
      <Container>
      <Cabecalho />
        <Cardapio />
      </Container>
      <ToastContainer autoClose={3000} />
    </Provider>
  )
}

export default App
