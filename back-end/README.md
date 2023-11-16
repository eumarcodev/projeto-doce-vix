
# 🍴 Doce Vix - API de Restaurante

![DoceVix](https://i.imgur.com/ESBpLeV.png)

v1.0.0

Este projeto representa a API oficial do restaurante Doce Vix, construída com as melhores práticas de desenvolvimento, incluindo o padrão Domain-Driven Design (DDD) e a metodologia de versionamento GitFlow.


## INDICE 

- <a href="#funcionalidades">Funcionalidades do projeto</a>

- <a href="#tecnologias">Tecnologias</a>

- <a href="#rodar">Como rodar este projeto?</a>

- <a href="#swagger">Swagger</a>

- <a href="#estrutura">Estrutura do projeto </a>

- <a href="#gitflow">Metodologia Gitflow </a>

- <a href="#autenticacao">Autenticação</a>

- <a href="#terminar">Proximos passos</a>

## Funcionalidades

- [x] Cadastro de usuarios
- [x] Cadastro e listagem de produtos
- [x] Cadastro de categorias
- [x] Upload de arquivos utilizando o multer
- [x] Login
- [x] Fazer pedido

## Tecnologias 

1. [NodeJs](https://nodejs.org/en)
2. [TypeScript](https://www.typescriptlang.org/)
3. [Express](https://expressjs.com/pt-br/)
4. [Mysql](https://www.mysql.com/)
5. [PrismaORM](https://www.prisma.io/)
6. [Multer](https://github.com/expressjs/multer)
7. [JWT (JSON Web Tokens)](https://jwt.io/)
8. [ Domain-Driven Design (DDD)](https://www.zup.com.br/blog/domain-driven-design-ddd)
9. [SOLID](https://medium.com/desenvolvendo-com-paixao/o-que-%C3%A9-solid-o-guia-completo-para-voc%C3%AA-entender-os-5-princ%C3%ADpios-da-poo-2b937b3fc530)
10. [GitFlow](https://www.alura.com.br/artigos/git-flow-o-que-e-como-quando-utilizar)


## Rodar

### Configurações iniciais

## Instalando dependencias do projeto



O projeto está utilizando o package manager 'npm' para lidar com os pacotes no node, sendo assim, para baixar as dependencias do projeto basta rodar o comando: npm install

## Configurando variáveis de ambiente

Copie o arquivo .env.example e renomeie para .env. Este arquivo contém as variáveis de ambiente necessárias para o projeto. Preencha as informações de acordo com a sua configuração.

Exemplo do conteúdo de .env.example:

NODE_ENV=
PORT=PORT


## Database
DATABASE_URL="YOUR DATABASE URL"
#

## Encryption
SALT=123456
#


## JWT
JWT_SALT=1234
#




## TOKEN
TOKEN_DURATION = "30d"
TOKEN_DURATION_DAYS = 20d
#


### Gerando esquema do Prisma e criando estrutura no banco

Para gerar o esquema do Prisma assim como a estrutura no banco de dados, basta rodar o comando:

`npx prisma db push`


Podes também rodar somente o comando `npx prisma generate` para gerar o esquema do prisma.

### Rodando o seeder para teste/desenvolvimento

Algumas mudanças na estrutura do prisma podem apagar o banco de dados, pensando nisso foi criado um script para geração de dados mocks para teste e desenvolvimento. Para rodar o script basta rodar o comando:

`npx prisma db seed`

## Rodando o projeto

Para rodar o projeto utilize o script `dev` dentro do packages.json:

`npm run dev`

---

## Estrutura

O projeto segue uma estrutura de diretórios coerente com o padrão DDD:

    node_modules/: Dependências do projeto.
    prisma/: Configurações e migrações do Prisma ORM.
    requests/: Exemplos de requisições
    src/: Código-fonte principal.
        middlewares/: Middlewares de Express, incluindo autenticação e tratamento de erros.
        modules/: Domínios da aplicação. Cada domínio contém sua lógica de negócios, rotas e serviços.
        routes/: Roteamento da API.
        shared/: Códigos compartilhados entre os domínios, como utilitários e configurações comuns.
        index.ts: Entrada principal do projeto.
        server.ts: Configuração do servidor Express.
    .env & .env.example: Configurações de ambiente.
    Configurações de desenvolvimento: .editorconfig, .eslintrc.json, .gitignore, tsconfig.json.
    swagger.json: Configurações da documentação Swagger.
    README.md: Este arquivo.
    package.json & package-lock.json: Configurações do projeto e dependências.



## GitFlow

Este projeto utiliza a metodologia GitFlow, que define um conjunto estrito de ramos para diferentes propósitos:

    master: Representa a versão estável atual.
    develop: Ramo de desenvolvimento, contendo funcionalidades que serão lançadas na próxima release.
    feature/*: Ramos dedicados para novas funcionalidades.
    hotfix/*: Ramos para correções rápidas em produção.
    release/*: Preparando novas releases.

## Autenticacao

A API utiliza JWT para autenticação e autorização. Ao se autenticar, um token será fornecido e deverá ser incluído no cabeçalho Authorization das requisições.
🚀 Como Rodar o Projeto


## Swagger 

![swagger](https://i.imgur.com/kIUKW9p.png)
![SwaggerCategorias](https://i.imgur.com/EpiOtSx.png)
![SwaggerProdutos](https://i.imgur.com/NpJunHB.png)


## Terminar 

- Finalizar documentação com swagger
 


