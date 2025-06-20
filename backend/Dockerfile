FROM node:18

WORKDIR /home/lukas/Escritorio/proyecto-final/backend

COPY package*.json ./
RUN npm install

COPY . .
COPY .env .env
EXPOSE 3000

CMD ["npm", "start"]