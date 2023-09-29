# Doce Vix - API

## Documentação (Swagger)

---

## Configurações iniciais:

### Instalando dependências do projeto

O projeto está utilizando o package manager 'npm' para lidar com os pacotes no node, sendo assim, para baixar as dependencias do projeto basta rodar o comando: `npm install`

<br/>

### Configurando variáveis de ambiente

Após clonar o projeto, clone o arquivo `.env.example` para um novo arquivo 
com nome `.env` na raiz do projeto. Em seguida, adicione as configurações
necessárias no arquivo recem criado. Ao final o arquivo deve se parecer com o código a seguir:

```
NODE_ENV=development
PORT=3333


# PUBLIC FILES
#
PUBLIC_FILES_URL=http://localhost:3333
PUBLIC_STATIC_LOCAL_FILES_URL=http://localhost:3333
j
# EMAIL SENDER
#
EMAIL_SENDER=
EMAIL_REGION=

# Database
#
DATABASE_URL="mysql://root:docker@localhost:3306/doce-vix"

# Encryption
#
SALT=10

# AWS S3
#

# JWT
#
JWT_SALT=123456

```

<br/>

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