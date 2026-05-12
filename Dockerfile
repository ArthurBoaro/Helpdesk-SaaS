FROM node:20.20.2

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3333

CMD sh -c "npx prisma db push && npm run start"


