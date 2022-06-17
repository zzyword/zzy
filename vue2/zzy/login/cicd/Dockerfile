FROM node:latest as builder
WORKDIR /app
COPY package.json .
RUN npm install pnpm -g --registry=http://172.16.47.143:8100/repository/npm-public/
RUN pnpm install --registry=http://172.16.47.143:8100/repository/npm-public/
COPY . .
RUN pnpm run build

FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
COPY cicd/nginx/docker.nginx.conf /etc/nginx/conf.d/docker.nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
EXPOSE 80
