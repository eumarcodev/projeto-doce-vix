class Comida {
  id: number;
  item: string;
  descricao: string;
  preco: GLfloat;
  img: string;
  sem?: string;
  quantidade: number;
  observacao?: string | undefined;

  constructor(
    id: number,
    item: string,
    descricao: string,
    preco: GLfloat,
    img: string,
    sem: string,
    observacao: string | undefined
  ) {
    this.id = id;
    this.item = item;
    this.descricao = descricao;
    this.preco = preco;
    this.img = img;
    this.sem = sem;
    this.quantidade = 1;
    this.observacao = observacao;
  }
}

export default Comida;
