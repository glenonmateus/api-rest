ARG NODE_VERSION=24
ARG PORT=3001

FROM node:${NODE_VERSION} AS build-env
COPY . /app
WORKDIR /app
RUN npm install --omit=dev

FROM gcr.io/distroless/nodejs${NODE_VERSION}-debian13:nonroot-e013592af2db72ae055e8ed066bcc7b7c2f32ae2
COPY --from=build-env /app /app

ARG PORT
WORKDIR /app
EXPOSE ${PORT}
CMD ["server.js"]
