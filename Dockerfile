# FROM node:current-alpine3.12 as build
# WORKDIR /app
# COPY . .
# RUN yarn install
FROM node:current-alpine3.12
# COPY --from=build /app /app
COPY . .
EXPOSE 8231
CMD ["node","--max-http-header-size=262144"."./modules/app.server.js"]