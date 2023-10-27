# 🍭 Doce Vix - API

## 📚 Documentação

A documentação do projeto está disponível via Swagger. Acesse para entender todos os endpoints e suas funcionalidades.

## 🚀 Iniciando com o Projeto

### Instalando dependências do projeto

O projeto está utilizando o package manager 'npm' para lidar com os pacotes no node, sendo assim, para baixar as dependencias do projeto basta rodar o comando: `npm install`


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