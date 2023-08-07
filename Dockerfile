# syntax=docker/dockerfile:1
   
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "src/index.ts"]
EXPOSE 9000