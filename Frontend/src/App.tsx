import React, { useEffect } from "react";
import EstiloGlobal, { Container, CabecalhoImg } from "./styles";
import Cabecalho from "./components/Cabecalho";
import Cardapio from "./containers/Cardapio";
import store from "./store";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./services/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <EstiloGlobal />
        <CabecalhoImg />
        <Container>
          <Cabecalho />
          {/* <Cardapio /> */}
        </Container>
        <ToastContainer autoClose={3000} />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
