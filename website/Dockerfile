FROM node:20-alpine AS builder
WORKDIR /app
COPY website/package*.json ./
RUN npm ci
COPY website/ .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY website/nginx.conf /etc/nginx/conf.d/default.conf
ENV PORT=80
EXPOSE 80
CMD sh -c "sed -i 's/PORT_PLACEHOLDER/'\"$PORT\"'/' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
