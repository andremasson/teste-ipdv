# CRUD básico

A aplicação foi desenvolvida com React no frontend e NodeJs + Express no backend e se comunicam por uma API REST. <br>
O banco de dados usado é MySQL.

Para acesso ao banco de dados foi usada a lib de ORM [`sequelize`](https://sequelize.org/).

## Pré-requisitros

### `MySQL (ou MariaDB)`<br>

### `npm`

## Banco de dados

### `MySQL` ou `MariaDB`

Executar os scripts `db/01 - CreateSchema.sql` e `db/02 - ImportData.sql`.<br>
Atualizar o arquivo `config/default.json` com as informações corretas para acesso ao banco de dados. (Trocar "dialect" de "mariadb" para "mysql2" se estiver usando MySQL)

## Instalar dependências

Após clonar este repositório, execute na raiz do projeto:

```
npm install
```

## Executar a aplicação

Inicie a aplicação com:

```
npm run dev
```

A aplicação poderá ser acessada em `http://localhost:3000`

## Licença

O conteúdo deste repositório é licenciado com uma Licença [Creative Commons Atribuição 3.0 Estados Unidos](https://creativecommons.org/licenses/by/3.0/us/).
