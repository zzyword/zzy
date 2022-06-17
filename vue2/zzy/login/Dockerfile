FROM nginx

COPY ./dist /usr/share/nginx/html
COPY ./nginx/docker.nginx.conf /etc/nginx/conf.d/docker.nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf

EXPOSE 80
