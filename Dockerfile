FROM nginx:alpine

RUN mkdir -p /etc/nginx/theme/assets/webfonts

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY theme/header.html /etc/nginx/theme/
COPY theme/footer.html /etc/nginx/theme/

COPY public/favicon.svg /etc/nginx/theme/
COPY public/favicon.ico /etc/nginx/theme/

COPY assets/bootstrap.min.css /etc/nginx/theme/assets/
COPY assets/all.min.css /etc/nginx/theme/assets/
COPY assets/webfonts/ /etc/nginx/theme/assets/webfonts/

EXPOSE 80