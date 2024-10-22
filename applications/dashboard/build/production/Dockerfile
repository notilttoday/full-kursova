FROM node:20-alpine as dist
WORKDIR /tmp/
COPY *.json *.js *.ts ./
COPY src/ src/
RUN npm install \
    && npm run build

FROM node:20-alpine as node_modules
WORKDIR /tmp/
COPY package.json package-lock.json tsconfig.json tsconfig.build.json ./
RUN npm install --production

FROM node:20-alpine
ARG APP_UID=1000
ENV APP_UID=${APP_UID}
RUN if [ $APP_UID = "1000" ]; then\
  deluser node; \
  fi \
  && addgroup -g $APP_UID application \
  && adduser -u $APP_UID -G application -s /bin/sh -D application

WORKDIR /app
COPY --from=node_modules /tmp/node_modules ./node_modules
COPY --from=dist /tmp/dist ./dist
COPY --from=dist /tmp/package.json ./package.json
USER application
CMD ["npm", "run", "start:prod"]
