# Exemplo de implementação do JSON Web Token no DenoJS

Exemplo de implementação da biblioteca de JWD "[JOSE](https://github.com/panva/jose)" no contexto do DenoJS

## Resultados

```ts
import * as token from "~token";

const someData = { foo: "bar", user: "guest" };

const userToken = await token.generateToken(someData);
/* result:
    eyJhbGciOiJIUzI1NiJ9.eyJmb28iOiJiYXIiLCJ1c2VyIjoiZ3Vlc3QiLCJpYXQiOjE3MzIzNzY2NDYsImlzcyI6InVybjpzeXN0ZW06dG9rZW4taXNzdWVyIiwiYXVkIjoidXJuOmp3dDphdWRpZW5jZSIsImV4cCI6MTczMjM4MDI0Nn0.cPB2DDMlOwbcPXB0jUZ9x0qxegxO8wt08rmA_GJweV0
*/

const verifyUser = await token.verifyToken(userToken);
// result: true

const takeUserData = await token.decryptToken(userToken);
/* result:
        {
                data: { foo: "bar", user: "guest" },
                iat: 1732376865,
                iss: "urn:system:token-issuer",
                aud: "urn:jwt:audience",
                exp: 1732380465
        }
*/
```

## Ferramentas utilizadas

- Linguagem: [TypeScript](https://www.typescriptlang.org/)
- Runtimer: [Deno JS](https://deno.land/)
- JWT lib: [JOSE](https://github.com/panva/jose)
- Testes: [Deno standard testing libraries](https://docs.deno.com/runtime/fundamentals/testing/#writing-tests)

## Testes / Cobertura

<img src="./.github/assets/locv-23-11-24.png" width="600" alt="LCOV Report"/>

## Para uso/reprodução

#### Ambiente:

- [Docker Engine](https://docs.docker.com/engine/) (Para uso de containers)
- [VS Code](https://code.visualstudio.com/) (Para visualização/interação)
- [Extensão DevContainers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) (Para uso do container)

#### Testes:

- Acione o comando `deno task test` para visualizar os testes
- Para visualizar a cobertura, acione o comando `deno task coverage:report` e abra o arquivo `./coverage/index.html`
