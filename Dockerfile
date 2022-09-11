FROM alpine:3.16.2 as builder
ARG BASE_URL
ARG PORT
RUN apk update && apk upgrade
RUN apk add zola git gettext
WORKDIR /opt/blog
COPY . .
RUN envsubst < nginx.template > nginx.conf
RUN git clone https://github.com/Mind-Help/zhuia.git /opt/blog/themes/zhuia
RUN zola build --base-url $BASE_URL

FROM nginx:alpine
COPY --from=builder /opt/blog/nginx.conf /etc/nginx/nginx.conf
RUN nginx -g 'daemon off;'
COPY --from=builder /opt/blog/public /usr/share/nginx/html
