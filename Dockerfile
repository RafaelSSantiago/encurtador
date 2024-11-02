FROM node:20.11.1
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm cache clean --force && npm install -g npm@latest
RUN npm install || npm install || npm install
COPY . .
RUN npx prisma generate
EXPOSE 3000
CMD ["npm", "run", "dev"]