## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## Env file example

```
# app config
PORT=
DEBUG=

# app secrets
JWT_TOKEN=testejwt

# database
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=
DB_DATABASE=
```

## Running the app

```bash
# init docker container
$ yarn docker:up

# watch mode
$ yarn dev

```

## TODO

-   Add .env module
-   Add logger module
-   Add cache module to speedup endpoints
-   Validate env variables before bootstrapping application
-   Add swagger
-   Add healthcheck to work within typeorm
-   Add hot reload
-   Add domain unit tests
-   Add integration tests into database
-   Add e2e on api endpoints
-   Add enpoints stress tests

## Stay in touch

### Authors:

-   [PedroLuisBrilhadori](https://github.com/PedroLuisBrilhadori)
-   [Jbnado](https://github.com/jbnado)

## License

my-pdv-api is [MIT licensed](LICENSE).
