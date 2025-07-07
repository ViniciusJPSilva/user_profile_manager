# User Profile Manager

User Profile Manager é uma aplicação full-stack para exibição e edição de perfis de usuários, com persistência de dados em um banco de dados MySQL. A aplicação permite visualizar e editar informações como nome, endereço, biografia e data de nascimento.

---

## Tecnologias Utilizadas

- **Frontend**

  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - Axios

- **Backend**

  - Node.js
  - Express
  - MySQL
  - dotenv
  - cors

---

## Clonando o Projeto

```bash
git clone https://github.com/ViniciusJPSilva/user_profile_manager.git
cd user_profile_manager
```

---

## Configuração dos Arquivos `.env`

### Backend: `backend/.env`

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=senha
DB_DATABASE=user_profile
```

### Frontend: `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## Criação do Banco de Dados e Tabelas

Abaixo um exemplo para criação manual via MySQL:

```sql
CREATE DATABASE user_profile;

USE user_profile;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255),
  birth_date DATE,
  biography TEXT
);

CREATE TABLE addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  street VARCHAR(255),
  number INT,
  complement VARCHAR(255),
  neighborhood VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip_code VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Instalação e Execução

### Backend

```bash
cd backend
npm install
npm start
```

A API será iniciada na porta definida no `.env` (por padrão: `http://localhost:5000`).

#### Teste da API

Para testar se a API está funcionando:

```bash
GET http://localhost:5000/status
```

Resposta esperada:

```json
{ "status": "API is running" }
```

---

### Frontend

```bash
cd frontend
npm install
npm start
```

A aplicação estará disponível em `http://localhost:5173` (porta padrão do Vite).

