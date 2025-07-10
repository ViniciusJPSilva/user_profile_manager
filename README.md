
# User Profile Manager

**User Profile Manager** é uma aplicação full-stack desenvolvida para gerenciamento de perfis de usuários. Permite a visualização e edição de informações como nome, endereço, biografia e data de nascimento, com persistência dos dados em um banco de dados MySQL.

---

## Sumário

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Clonagem do Repositório](#clonagem-do-repositório)
- [Configuração dos Arquivos `.env`](#configuração-dos-arquivos-env)
- [Criação do Banco de Dados](#criação-do-banco-de-dados)
- [Instalação e Execução](#instalação-e-execução)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Teste da API](#teste-da-api)

---

## Tecnologias Utilizadas

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Axios

### Backend

- Node.js
- Express
- MySQL
- dotenv
- cors

---

## Clonagem do Repositório

```bash
git clone https://github.com/ViniciusJPSilva/user_profile_manager.git
cd user_profile_manager
```

---

## Configuração dos Arquivos `.env`

É necessário criar manualmente os arquivos `.env` nos diretórios `backend/` e `frontend/` antes de executar o projeto.

### `backend/.env`

```env
PORT=<porta>
DB_HOST=<host_do_banco>
DB_USER=<usuario_do_banco>
DB_PASSWORD=<senha_do_banco>
DB_DATABASE=<nome_do_banco>
```

### `frontend/.env`

```env
VITE_API_BASE_URL=<url_da_api>
```

---

## Criação do Banco de Dados

A estrutura do banco de dados pode ser criada manualmente utilizando o seguinte script SQL:

```sql
CREATE DATABASE profiles;

USE profiles;

CREATE TABLE IF NOT EXISTS addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    street VARCHAR(255) NOT NULL,
    number VARCHAR(50),
    complement VARCHAR(255),
    neighborhood VARCHAR(255),
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zipCode VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthDate DATE,
    biography TEXT,
    profilePicture VARCHAR(255),
    addressId INT,
    FOREIGN KEY (addressId) REFERENCES addresses(id) ON DELETE SET NULL
);
```

Alternativamente, é possível utilizar um script automatizado para criar o banco de dados, tabelas e inserir dados iniciais. Para isso:

1. Acesse o diretório `backend/`.
2. Instale as dependências com `npm install`.
3. Execute o script:

```bash
node scripts/initDatabase.js
```

Certifique-se de que o arquivo `.env` do backend esteja corretamente configurado.

---

## Instalação e Execução

### Backend

```bash
cd backend
npm install
npm start
```

A API será iniciada na porta definida no arquivo `.env`. Por padrão: `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em: `http://localhost:5173`.

---

## Teste da API

Para verificar se a API está em execução corretamente, acesse o seguinte endpoint:

```
GET http://localhost:5000/status
```

Resposta esperada:

```json
{
  "status": "API is running"
}
```

---
