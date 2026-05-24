FROM node:22 AS builder
WORKDIR /app
COPY package.json yarn.lock /app
COPY . .
RUN yarn install --production
RUN yarn build

FROM node:22
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 8020
ENV NODE_ENV=production
ENV PORT=8020
CMD ["node", "build"]