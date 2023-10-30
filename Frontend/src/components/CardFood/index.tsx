import * as S from "./styles";
import Modal from "react-modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adicionar } from "../../store/reducers/carrinho";
import Comida from "../../models/Comida";
Modal.setAppElement("#root");

export type Props = Comida;

const CardFood = ({ item, descricao, preco, img, sem, id }: Props) => {
  const dispatch = useDispatch();
  const [observacao, setObservacao] = useState('')
  const [modalIsOpen, setIsOpen] = useState(false)

  const AbrirModal = () => {
    setIsOpen(true);
  };

  const FecharModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <S.Card onClick={AbrirModal}>
        <S.ImgCard src={img} />
        <S.DivInfos>
          <label htmlFor={item}>{item}</label> <br />
          <p>{descricao}</p>
          <S.Preco>
            <span>R${preco.toFixed(2)}</span>
          </S.Preco>
        </S.DivInfos>

        {sem ? (
          <>
            <S.DiaSemana>
              <span>{sem}</span>
            </S.DiaSemana>
          </>
        ) : null}
      </S.Card>
      <S.ModalStyle isOpen={modalIsOpen} onRequestClose={FecharModal}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <S.BiDishStyle />
            <S.FiXStyle onClick={FecharModal} />
          </div>
          <div style={{ textAlign: "center" }}>
            <S.ImgCardModal src={img} />
          </div>
        </div>
        <h2>{item}</h2>
        <p>{descricao}</p>
        <textarea value={observacao} onChange={(e) => setObservacao(e.target.value)} placeholder="Observações (opcional)" />
        <S.DivButtons>
          <S.BotaoAdicionar
            type="button"
            onClick={() => {
              dispatch(
                adicionar({
                  item,
                  descricao,
                  img,
                  sem,
                  preco,
                  id,
                  quantidade: 1,
                  observacao,
                })
              );
              toast.success(`Item adicionado ao carrinho :D`, {
                position: toast.POSITION.BOTTOM_LEFT,
              });
              setObservacao('')
            }}
          >
            <S.ImPlusStyle />
            Adicionar
            <div>R${preco.toFixed(2)}</div>
          </S.BotaoAdicionar>
        </S.DivButtons>
      </S.ModalStyle>
    </>
  );
};

export default CardFood;
