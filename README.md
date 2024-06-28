# Teste Técnico Fullstack GrupoSC

### Tecnologias:

Backend:

- Java 17
- Spring Web
- Spring JPA
- Banco de dados H2
- Banco de dados Postgres em um container Docker para desenvolvimento

Frontend:

- Angular 18
- Bootstrap 5

## Endpoints Backend

**url_base:**`http://localhost:8080/api`

### Clientes

- GET: `/clientes`: busca todos os clientes
- GET: `/clientes/{cnpj}`: buscar cliente pelo CNPJ
- GET: `clientes/filtro?razaoSocial={razaoSocial}`: buscar cliente pela razão social
- DELETE: `/clientes/{cnpj}`: deletar cliente
- POST: `/clientes`: salvar um novo cliente

```json
{
	"cnpj": "13606516000230",
	"razaoSocial": "Empresa A LTDA",
	"usuario": "empresa@mail.com",
	"senha": "senha@123",
	"status": "ATIVO"
}
```

- PUT: `/clientes/{cnpj}`: Editar dados de um cliente (o CNPJ não pode ser alterado)

```json
{
	"cnpj": "13606516000230",
	"razaoSocial": "Empresa AAA LTDA",
	"usuario": "empresaAAA@mail.com",
	"senha": "senha@12345",
	"status": "INATIVO"
}
```

### Login

- POST: `/login`: para verificar se existe usuário cadastrado anteriormente em `clientes`

  ```json
  {
  	"usuario": "fulano@mail.com",
  	"senha": "senha@123"
  }
  ```

