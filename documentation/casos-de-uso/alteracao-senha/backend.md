## Alteração de Senha

### Pré-requisitos

1. O usuário deve estar autenticado no sistema

### Passos

#### Caso de Sucesso

1. Deve ser chamado a api com senha atual e senha nova o token
2. Validar se a senha nova é válida
3. Obter dados do utilizador por id do repositório
4. validar que o utilizador existe
5. Validar que a senha atual fornecida é valida
6. Converter senha nova recebida para uma hash
7. Atualizar o senha no repositório
8. Enviar **Resposta de Sucesso**

#### Caso erro no passo 2

1.  Enviar **Resposta de senha incorreta**

#### Caso erro no passo 4

1.  Enviar **Resposta de dados inválidos**

#### Caso erro no passo 6

1. Enviar **Resposta de unauthorized** ????