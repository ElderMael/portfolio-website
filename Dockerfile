FROM node:lts as build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm install -g npm && \
    npm cache clean --force && \
    npm install --no-optional --verbose

COPY . ./

RUN npm run build

FROM nginx:1.17.8-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]