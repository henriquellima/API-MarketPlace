# MarketPlace API

Para rodar a api, basta abrir o terminal e executar dois comandos, 'npm install' e depois 'npm run dev', acessar pelo localhost:3333.


A api permite:

-   Fazer Login
-   Cadastrar Usuário
-   Detalhar Usuário
-   Editar Usuário
-   Listar produtos
-   Detalhar produtos
-   Cadastrar produtos
-   Editar produtos
-   Remover produtos
-   Filtrar produtos por categoria


## **Endpoints**

### **Cadastrar usuário**

#### `POST` `/usuario`

Essa é a rota que será utilizada para cadastrar um novo usuario no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):
    -   nome
    -   email
    -   senha
    -   nome_loja

-   **Resposta**  

-   **REQUISITOS OBRIGATÓRIOS**  
    -   Validar os campos obrigatórios:
        -   nome
        -   email
        -   senha
        -   nome_loja

#### **Exemplo de requisição**
```json
// POST /usuario
{
    "nome": "José",
    "email": "jose@lojadasflores.com.br",
    "senha": "j1234",
    "nome_loja": "Loja das Flores"
}
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Já existe usuário cadastrado com o e-mail informado."
}
```

### **Login do usuário**

#### `POST` `/login`

Essa é a rota que permite o usuario cadastrado realizar o login no sistema.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):  
    -   email
    -   senha


-   **REQUISITOS OBRIGATÓRIOS**

    -   Validar os campos obrigatórios:
        -   email
        -   senha

#### **Exemplo de requisição**
```json
// POST /login
{
    "email": "jose@lojadasflores.com.br",
    "senha": "j1234"
}
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Usuário e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário logado, recebendo no header com o formato Bearer Token. Portanto, em cada funcionalidade será necessário validar o token informado.
---


### **Detalhar usuário**

#### `GET` `/usuario`

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo da requisição.  


#### **Exemplo de requisição**
```json
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "José",
    "email": "jose@lojadasflores.com.br",
    "nome_loja": "Loja das Flores"
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Atualizar usuário**

#### `PUT` `/usuario`

Essa é a rota que será chamada quando o usuário quiser realizar alterações no seu próprio usuário.  
**Atenção!:** O usuário deverá ser identificado através do ID presente no token de autenticação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):  
    -   nome
    -   email
    -   senha
    -   nome_loja


-   **REQUISITOS OBRIGATÓRIOS**
        -   nome
        -   email
        -   senha
        -   nome_loja

#### **Exemplo de requisição**
```json
// PUT /usuario
{
    "nome": "José de Abreu",
    "email": "jose_abreu@gmail.com",
    "senha": "j4321",
    "nome_loja": "Loja das Flores Cheirosas"
}
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O e-mail informado já está sendo utilizado por outro usuário."
}
```

### **Listar produtos do usuário logado**

#### `GET` `/produtos`

Essa é a rota que será chamada quando o usuario logado quiser listar todos os seus produtos cadastrados.  
**Lembre-se:** Deverão ser retornados **apenas** produtos associados ao usuário logado, que deverá ser identificado através do ID presente no token de validação.  

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    Não deverá possuir conteúdo no corpo (body) da requisição.  


#### **Exemplo de requisição**
```json
// GET /produtos
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "quantidade": 12,
        "categoria": "Camisas",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq",
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Calça jeans azul",
        "quantidade": 8,
        "categoria": "Calças",
        "preco": 4490,
        "descricao": "Calça jeans azul.",
        "imagem": "https://bit.ly/3ctikxq",
    },
]
```
```json
// HTTP Status 200 / 201 / 204
[]
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Detalhar um produto do usuário logado**

#### `GET` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser obter um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser retornado **apenas** produto associado ao usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID do produto no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.  


#### **Exemplo de requisição**
```json
// GET /produtos/44
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "usuario_id": 1,
    "nome": "Camisa preta",
    "quantidade": 8,
    "categoria": "Camisa",
    "preco": 4990,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não existe produto cadastrado com ID 44."
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O usuário logado não tem permissão para acessar este produto."
}
```

### **Cadastrar produto para o usuário logado**

#### `POST` `/produtos`

Essa é a rota que será utilizada para cadastrar um produto associado ao usuário logado.  
**Lembre-se:** Deverá ser possível cadastrar **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Sem parâmetros de rota ou de query.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):  
    -   nome
    -   quantidade
    -   categoria
    -   preco
    -   descricao
    -   imagem


-   **REQUISITOS OBRIGATÓRIOS**
        -   nome
        -   quantidade
        -   preco
        -   descricao

#### **Exemplo de requisição**
```json
// POST /produtos
{
    "nome": "Camisa preta",
    "quantidade": 8,
    "categoria": "Camisa",
    "preco": 4990,
    "descricao": "Camisa de malha com acabamento fino.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O preço do produto deve ser informado."
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para cadastrar um produto, o usuário deve estar autenticado."
}
```

### **Atualizar produto do usuário logado**

#### `PUT` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser atualizar um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser possível atualizar **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.

-   **Requisição**  
    Deverá ser enviado o ID do produto no parâmetro de rota do endpoint.  
    O corpo (body) da requisição deverá possuir um objeto com as seguintes propriedades (respeitando estes nomes):  
    -   nome
    -   quantidade
    -   categoria
    -   preco
    -   descricao
    -   imagem


-   **REQUISITOS OBRIGATÓRIOS**
        -   nome
        -   quantidade
        -   preco
        -   descricao

#### **Exemplo de requisição**
```json
// PUT /produtos/2
{
    "nome": "Calça jeans preta",
    "quantidade": 22,
    "categoria": "Calças",
    "preco": 4490,
    "descricao": "Calça jeans preta.",
    "imagem": "https://bit.ly/3ctikxq"
}
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O usuário autenticado não ter permissão para alterar este produto."
}
```

### **Excluir produto do usuário logado**

#### `DELETE` `/produtos/:id`

Essa é a rota que será chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados.  
**Lembre-se:** Deverá ser possível excluir **apenas** produtos associados ao próprio usuário logado, que deverá ser identificado através do ID presente no token de validação.  

-   **Requisição**  
    Deverá ser enviado o ID do produto no parâmetro de rota do endpoint.  
    O corpo (body) da requisição não deverá possuir nenhum conteúdo.  


#### **Exemplo de requisição**
```json
// DELETE /produtos/88
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Não existe produto para o ID 88."
}
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O usuário autenticado não tem permissão para excluir este produto."
}
```

---


### **Filtrar produtos por categoria**

Na funcionalidade de listagem de produtos do usuário logado (**GET /produtos**), deveremos incluir um parâmetro do tipo query **categoria** para que seja possível consultar apenas produtos de uma categoria específica.  
**Lembre-se:** Deverão ser retornados **apenas** produtos associados ao usuário logado, que deverá ser identificado através do ID presente no token de validação.  

-   **Requisição**  
    Parâmetro opcional do tipo query **categoria**.  
    Não deverá possuir conteúdo no corpo (body) da requisição.  


#### **Exemplo de requisição**
```json
// GET /produtos?categoria=camisas
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```json
// HTTP Status 200 / 201 / 204
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Camisa preta",
        "quantidade": 12,
        "categoria": "Camisas",
        "preco": 4990,
        "descricao": "Camisa de malha com acabamento fino.",
        "imagem": "https://bit.ly/3ctikxq",
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "Calça jeans azul",
        "quantidade": 8,
        "categoria": "Calças",
        "preco": 4490,
        "descricao": "Calça jeans azul.",
        "imagem": "https://bit.ly/3ctikxq",
    },
]
```
```json
// HTTP Status 200 / 201 / 204
[]
```
```json
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

---


