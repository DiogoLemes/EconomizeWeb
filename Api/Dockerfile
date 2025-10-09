FROM node:trixie-slim

RUN useradd -ms /bin/bash container
WORKDIR /home/container
COPY . .

RUN npm install
USER container

EXPOSE 3000

CMD ["npm", "run", "dev"]