FROM node:lts as build

ENV CI=true

WORKDIR /usr/src/app
COPY . ./
RUN npm install --no-optional
RUN npm run build

FROM nginx:1.17.8-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]