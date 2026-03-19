FROM nginx:alpine

RUN mkdir -p /etc/nginx/theme/webfonts

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY public/favicon.svg /etc/nginx/theme/
COPY public/favicon.ico /etc/nginx/theme/

COPY theme/header.html /etc/nginx/theme/
COPY theme/footer.html /etc/nginx/theme/

COPY theme/bootstrap.min.css /etc/nginx/theme/
COPY theme/all.min.css /etc/nginx/theme/
COPY theme/webfonts/ /etc/nginx/webfonts/

EXPOSE 80