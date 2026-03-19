FROM nginx:alpine

RUN apk add --no-cache openssl

ENV TZ=Europe/Kyiv
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /etc/nginx/certs && \
    openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
    -keyout /etc/nginx/certs/privkey.pem \
    -out /etc/nginx/certs/fullchain.pem \
    -subj "/C=UA/ST=Kyiv/L=Kyiv/O=Helpdesk/OU=IT/CN=localhost"

RUN mkdir -p /etc/nginx/theme

COPY theme/ /etc/nginx/theme/

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443