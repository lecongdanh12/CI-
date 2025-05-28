# Build stage
FROM node:lts as build

WORKDIR /app

COPY package*.json ./
COPY .env ./

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV CI=false
ENV NODE_OPTIONS=--openssl-legacy-provider

RUN npm install --legacy-peer-deps --force

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]