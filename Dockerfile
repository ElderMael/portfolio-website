FROM node:lts as build

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm cache clean && \
    npm install --no-optional --verbose
COPY . ./
RUN npm run build

FROM nginx:1.17.8-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]