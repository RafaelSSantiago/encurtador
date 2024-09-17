# Encurtador de URLs

# Projeto Encurtador de URLs

Este projeto é um encurtador de URLs construído com Node.js, Express, TypeScript e Prisma.

## Estrutura do Projeto

```
.
├── .env
├── .gitignore
├── docs/
│   └── README.md
├── package.json
├── prisma/
│   ├── migrations/
│   │   ├── 20240914153223_add_url_model/
│   │   └── 20240915171500_change_user_id_to_uuid/
│   └── migration_lock.toml
│   └── schema.prisma
├── src/
│   ├── application/
│   │   ├── DeleteUrlUseCase.ts
│   │   ├── LoginUserCase.ts
│   │   ├── RedirectUrlUseCase.ts
│   │   ├── RegisterUserUseCase.ts
│   │   ├── ShortenUrlUseCase.ts
│   │   └── UpdateUrlUseCase.ts
│   ├── domain/
│   │   ├── entities/
│   │   ├── errors/
│   │   ├── helpers/
│   │   ├── protocols/
│   │   ├── repositories/
│   │   └── validators/
│   ├── dtos/
│   │   └── ...
│   ├── index.ts
│   ├── infrastructure/
│   │   └── ...
│   └── interfaces/
│       └── ...
└── tsconfig.json
```

## Dependências

As principais dependências do projeto são:

- `express`: Framework web para Node.js.
- `prisma`: ORM para interagir com o banco de dados.
- `jsonwebtoken`: Biblioteca para trabalhar com tokens JWT.
- `bcrypt`: Biblioteca para hashing de senhas.
- `dotenv`: Biblioteca para carregar variáveis de ambiente de um arquivo `.env`.

## Configuração

### Variáveis de Ambiente

O projeto utiliza variáveis de ambiente definidas no arquivo `.env`. Exemplo:

```
DATABASE_URL=""
JWT_SECRET=""
```

Os scripts definidos no `package.json` incluem:

- `build`: Compila o projeto TypeScript.
- `start`: Inicia o servidor usando `ts-node`.
- `dev`: Inicia o servidor em modo de desenvolvimento usando `ts-node-dev`.

## Rotas

### Rotas de URLs

Definidas em `src/interfaces/routes/urlRoutes.ts`:

- `POST /url/shorten`: Cria uma URL encurtada.
- `GET /url/:hash`: Redireciona para a URL original com base no hash fornecido.
- `DELETE /url/:hash`: Deleta uma URL encurtada com base no hash fornecido. Requer autenticação.
- `PUT /url/:hash`: Atualiza a URL original de uma URL encurtada com base no hash fornecido. Requer autenticação.

### Rotas de Usuários

Definidas em `src/interfaces/routes/userRoutes.ts`:

- `POST /user`: Registra um novo usuário.
- `GET /user/url`: Lista todas as URLs encurtadas do usuário autenticado. Requer autenticação.

### Rotas de Login

Definidas em `src/interfaces/routes/loginRoutes.ts`:

- `POST /login`: Realiza o login de um usuário.

## Controladores

### LoginController

Definido em `src/interfaces/controllers/LoginController.ts`:

- `login(req: Request, res: Response)`: Realiza o login de um usuário.

### UserController

Definido em `src/interfaces/controllers/UserController.ts`:

- `createUserDb(req: Request, res: Response)`: Registra um novo usuário no banco de dados.
- `listUserUrls(req: Request, res: Response)`: Lista todas as URLs encurtadas do usuário autenticado.

### UrlController

Definido em `src/interfaces/controllers/UrlController.ts`:

- `shortenUrl(req: Request, res: Response)`: Cria uma URL encurtada.
- `findHashBd(req: Request, res: Response)`: Redireciona para a URL original com base no hash fornecido.
- `deleteShortenedUrl(req: Request, res: Response)`: Deleta uma URL encurtada com base no hash fornecido.
- `updateOriginalUrl(req: Request, res: Response)`: Atualiza a URL original de uma URL encurtada com base no hash fornecido.

## Inicialização do Servidor

O servidor é inicializado no arquivo `src/index.ts`:

```typescript
import express from "express";
import { urlRoutes } from "./interfaces/routes/urlRoutes";
import { userRoutes } from "./interfaces/routes/userRoutes";
import { loginRoutes } from "./interfaces/routes/loginRoutes";
import { errorReq } from "./infrastructure/middlewares/ErrorReq";

const app = express();
app.use(express.json());

app.use("/url", urlRoutes);
app.use("/user", userRoutes);
app.use("/login", loginRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  next(error);
});
```

## Como Executar

1. Instale as dependências:

```bash
npm install
```

2. Configure as variáveis de ambiente no arquivo `.env`.

3. Execute as migrações do Prisma para configurar o banco de dados:

```bash
npx prisma migrate dev
```

4. Inicie o servidor:

```bash
npm run dev
```

O servidor estará disponível em [http://localhost:3000](http://localhost:3000).
