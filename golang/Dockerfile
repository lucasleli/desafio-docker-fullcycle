FROM golang:alpine AS build

WORKDIR /app/example
RUN go mod init example/hello
COPY hello.go .

# Compilar o binário estático
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o hello .

FROM scratch

WORKDIR /tmp

COPY --from=build /app/example .

ENTRYPOINT ["./hello"]