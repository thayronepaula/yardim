# JSON2CSV com Angular e Node.js

Este é um projeto fullstack utilizando Angular (versão 18) no front-end e Node.js (versão 22.11.0) com Express no back-end. O projeto está organizado em duas pastas principais, **frontend** e **backend**, para facilitar a separação das responsabilidades.

## Estrutura do Projeto

- `frontend/`: contém o código do front-end construído com Angular.
  - **Porta de execução**: 4200
  - **Script para iniciar o front-end**: `npm start`

- `backend/`: contém o código do back-end construído com Node.js e Express.
  - **Porta de execução**: 3331
  - **Script para iniciar o back-end**: `node src/server.js`

## Pré-requisitos

Para executar este projeto, você precisa ter instalado:

- [Node.js 22.11.0](https://nodejs.org/download/release/v22.11.0/) ou superior

## Instruções de Instalação e Execução

1. Clone o repositório para o seu ambiente local.

2. Instale as dependências do front-end e do back-end.

    ```bash
    # Navegue para a pasta de front-end e instale as dependências
    cd frontend
    npm install

    # Volte ao diretório raiz e vá para a pasta de back-end, então instale as dependências
    cd ../backend
    npm install
    ```

3. Inicie o servidor back-end.

    ```bash
    # Certifique-se de que está na pasta 'backend' e então inicie o servidor
    cd backend
    node src/server.js
    ```

4. Abra um novo terminal e inicie o servidor front-end.

    ```bash
    # Navegue para a pasta 'frontend' e inicie o front-end
    cd frontend
    npm start
    ```

5. Abra o navegador e acesse [http://localhost:4200](http://localhost:4200) para ver a aplicação Angular em execução, que se comunicará com o servidor Node.js rodando em [http://localhost:3331](http://localhost:3331).
