FROM node:12.0 as build

ENV CI=true

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm --no-color config set color false && \
    npm --no-color cache clean --force && \
    npm --no-color install --no-optional --verbose

COPY . ./

RUN npm --no-color run build

FROM nginx:1.17.8-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]