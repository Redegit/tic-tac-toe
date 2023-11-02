FROM ubuntu
RUN apt-get update
RUN apt-get install nginx -y
COPY html/index.html /var/www/html/
COPY styles/style.css /var/www/styles/
COPY scripts/script.js /var/www/scripts/
COPY styles/fonts/crewniverse_font_V6_0.ttf /var/www/styles/fonts/
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
