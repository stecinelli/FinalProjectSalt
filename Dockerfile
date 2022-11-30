FROM node:17-alpine AS builder
RUN apk add --update make
WORKDIR /app
COPY client ./client
COPY server ./server
COPY Makefile ./Makefile
RUN make install-dependencies-client
RUN make build-and-copy

FROM node:17-alpine
WORKDIR /app
COPY --from=builder /app/server ./
RUN npm install --silent
EXPOSE 8080
CMD ["npm", "start"]
