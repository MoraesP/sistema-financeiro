## Tech Challenge - Projeto de sistema financeiro

Aplicação desenvolvida em [Next.js](https://nextjs.org) Pedro Moraes

## Como rodar o projeto

Após clonar o projeto, em um editor de código, navegue até o diretório do projeto e em um terminal rode o seguinte comando para instalar as dependências:

```bash
npm install
```

Em seguida, para iniciar o servidor de desenvolvimento, rode o comando:

```bash
npm run dev
```

Acesse o endereço [http://localhost:3000](http://localhost:3000) em seu navegador para acessar a aplicação.

Foi definido um docker compose para rodar a aplicação junto com a aplicação do back https://github.com/viniciosneves/fiap-bytebank-backend

Dentro de uma pasta com os dois projetos definia

.docker-compose-yml
```bash
services:
  app:
    build:
      context: ./fiap-bytebank-backend
    container_name: bytebank_backend
    ports:
      - '3000:3000'
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/bytebank
    env_file:
      - .env
    depends_on:
      - mongo

  mongo:
    image: mongo:7.0
    container_name: bytebank_mongo_novo
    ports:
      - '27017:27017'
    volumes:
      - mongo-data:/data/db

  frontend:
    build:
      context: ./sistema-financeiro  # Caminho para o diretório do seu front-end
    container_name: bytebank_frontend
    ports:
      - '3001:3000'  # Mapeia a porta 3000 do contêiner para 3001 na máquina local
    depends_on:
      - app  # Garante que o back-end esteja rodando antes de iniciar o front-end
    environment:
      - REACT_APP_API_URL=http://app:3000  # URL da API do back-end no Docker Compose
    volumes:
      - ./sistema-financeiro:/usr/src/app  # Monta o diretório do front-end no contêiner para desenvolvimento em tempo real

volumes:
  mongo-data:
```

.env
```bash
NODE_ENV=development
MONGODB_URI=mongodb://mongo:27017/bytebank
REACT_APP_API_URL=http://app:3000
```

Para rodar o storybook da aplicação, rode o comando:
```bash
npm run storybook
```