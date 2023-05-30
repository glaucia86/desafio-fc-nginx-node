FROM nginx:1.23.0-alpine

COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD [ "nginx", "-g", "daemon off;" ]


