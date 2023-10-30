import styled from "styled-components";
import variables from "../../styles/variables";
import { ModalStyle } from "../CardFood/styles";
import {
  BsCart4,
  BsTrash3,
  BsWallet2,
  BsCart2,
  BsArrowRightCircle,
} from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { MdDeliveryDining } from "react-icons/md";
import { GoCheckCircleFill } from "react-icons/go";
import { AiOutlineUser } from "react-icons/ai";
import { Botao } from "../../styles";

export const BsCart2Style = styled(BsCart2)`
  color: #fff;
`;

export const FiCheckCircleStyle = styled(GoCheckCircleFill)`
  color: ${variables.verdeClaro};
  font-size: 26px;
`;

export const BsArrowRightCircleStyle = styled(BsArrowRightCircle)`
  color: #fff;
`;

export const BsTrash3Style = styled(BsTrash3)`
  color: ${variables.vermelho};
  font-size: 18px;
`;

export const FiXStyle = styled(FiX)`
  cursor: pointer;
  transition: all 0.1s ease;
  font-size: 25px;

  &:hover {
    color: #c3c3c3;
  }

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

export const BsCart4Style = styled(BsCart4)`
  color: #000;
  font-size: 30px;

  @media (max-width: 767px) {
    font-size: 25px;
  }
`;

export const BsWallet2Style = styled(BsWallet2)`
  color: #000;
`;

export const MdDeliveryDiningStyle = styled(MdDeliveryDining)`
  color: #000;
  font-size: 24px;
`;

export const AiOutlineUserStyle = styled(AiOutlineUser)`
  color: #000;
  font-size: 20px;
`;

export const CardCarrinho = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  cursor: pointer;

  padding: 18px;

  width: 100%;
  height: 50px;

  color: #fff;
  font-weight: bold;
  background-color: ${variables.corPrincipal};
  border-radius: 20px 20px 0px 0px;
`;

export const ModalStyleCart = styled(ModalStyle)`
  padding: 40px;
  max-height: 80vh;
  overflow-y: auto;

  @media (max-width: 767px) {
    padding: 20px;
    max-height: 100vh;
    width: 95vw;
  }
`;

export const ModalTitle = styled.h1`
  font-size: 25px;

  @media (max-width: 767px) {
    font-size: 22px;
  }
`;

export const ModalButton = styled.div`
  margin-top: 24px;
  margin-bottom: 24px;
  padding: 9px;
  text-align: center;
  border-radius: 10px;
  border: 1px solid #e1e1e1;
`;

export const ModalItens = styled.ul`
  li {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr 1fr; /* Crie quatro colunas para quantidade, item, preço e ícone da lixeira */
    gap: 16px; /* Espaço entre as colunas */
    align-items: center; /* Alinhe verticalmente os elementos */
    padding: 5px;
    margin-bottom: 24px;
    border-bottom: 1px solid #e1e1e1;
  }
`;

export const ModalPayment = styled.div`
  padding-top: 44px;
  margin-bottom: 30px;
`;

export const ModalTittlePay = styled.h3`
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`;
export const ModalLabel = styled.label`
  display: flex;
  gap: 8px;
  padding-bottom: 10px;
  font-size: 16px;
`;

export const ModalForm = styled.form`
  margin-top: 14px;

  div {
    display: flex;
    flex-direction: column;
  }

  input {
    padding: 4px;
    margin-bottom: 6px;
    border-radius: 5px;
    border: none;
    border-bottom: 1px solid #000;
    font-weight: bold;

    &:focus {
      box-shadow: 0 0 0 0;
      outline: 0;
    }
  }
`;

export const ModalPrice = styled.div`
  padding-top: 25px;
  padding-bottom: 10px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e1;
`;

export const ModalButtons = styled.div`
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(2, 1fr);
`;

export const BotaoFinalizar = styled(Botao)`
  gap: 6px;
  margin-top: 14px;
  font-size: 15px;
  background-color: ${variables.corBotoesAceitar};

  &:hover {
    background-color: ${variables.verdeEscuro};
  }

  @media (max-width: 767px) {
    font-size: 13px;
    padding: 8px;
    gap: 4px;
  }
`;

export const BotaoFinalizarIndisponivel = styled(BotaoFinalizar)`
  background-color: #c3c3c3;

  &:hover {
    background-color: ${variables.cinzaEscuro};
  }
`;

export const BotaoContinuarComprando = styled(BotaoFinalizar)`
  background-color: ${variables.cinza};

  &:hover {
    background-color: ${variables.cinzaEscuro};
  }
`;

export const BotaoDeletarComida = styled.button`
  cursor: pointer;
  border: none;
  background: none;
`;

export const ModalFinalizarPedido = styled(ModalStyle)`
  text-align: center;
  p {
    margin-top: 24px;

    @media (max-width: 414px) {
      font-size: 14px;
    }
  }
`;

export const ContainerContinuarParaSite = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Errors = styled.span`
  color: red;
  font-weight: bold;
  padding-bottom: 10px;
`;
