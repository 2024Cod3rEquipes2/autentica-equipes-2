## Alteração de Nome

### Pré-requisitos

1. O usuário deve estar autenticado no sistema

### Passos

#### Caso de Sucesso

1. Deve ser chamado a api com nome novo e o token
2. Validar que recebemos token válido
3. Validar que o nome fornecido é válido
4. Obter dados do utilizador por id do repositório
5. Validar que o utilizador existe
6. Atualizar o nome no repositório
7. Enviar **Resposta de Sucesso**

#### Caso erro no passo 2

1.  Enviar **Resposta de dados em falta**

#### Caso erro no passo 4

1. Enviar **Resposta de unauthorized**