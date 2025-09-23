FROM node:trixie-slim

WORKDIR /code
COPY . .

#mudar de usuário antes de executar

RUN npm install \
    && npm run build

EXPOSE 5173

CMD ["npm", "run", "dev_docker"]