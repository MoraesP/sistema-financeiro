# Use uma imagem base oficial do Node.js
FROM node:18-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos necessários para o container
COPY package.json package-lock.json ./ 

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o container
COPY . .

# Compila o projeto Next.js para produção
RUN npm run build

# Etapa final: cria uma imagem leve para servir o app
FROM node:18-alpine AS runner

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários da etapa anterior
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json

# Instala apenas as dependências de produção
RUN npm install --production

# Expõe a porta 4200
EXPOSE 4200

# Comando para iniciar o servidor Next.js na porta 4200
CMD ["npm", "run", "start", "--", "-p", "4200"]