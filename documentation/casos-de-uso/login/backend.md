## Server

### Passos

#### Caso de Sucesso

1. deve ser chamado a api com email e senha
2. Validar que email e password fornecidos são válidos
3. Obter dados do utilizador por email do repositório
4. Validar se utilizador existe
5. Converter senha recebida para uma hash
6. Comparar hash com a hash que está no servidor
7. Criar token
8. enviar **Resposta de Sucesso**

#### Caso erro no passo 2

1. Enviar **Resposta de dados em falta**

#### Caso erro no passo 4

1. Enviar **Resposta de unauthorized**

#### Caso erro no passo 6

1. Enviar **Resposta de unauthorized**

## Recuperação de Senha

### Passos

#### Caso de Sucesso

1. Deve ser chamado a api com email
2. Validar que o email fornecido é válido
3. Criar um token de recuperação de senha
4. Enviar um email com o token para o usuário
5. Validar que o token recebido é válido
6. Redefinir senha
7. Enviar email de confirmação

#### Caso erro no passo 1

1.  **A definir**

#### Caso erro no passo 5

1. Enviar **Resposta de token inválido**

## Alteração de Nome

### Pré-requisitos

1. O usuário deve estar autenticado no sistema

### Passos

#### Caso de Sucesso

1. Deve ser chamado a api com nome novo
2. Validar que o nome fornecido é válido
3. Obter dados do utilizador por email do repositório
4. Atualizar o nome no repositório
5. Enviar **Resposta de Sucesso**

#### Caso erro no passo 2

1.  Enviar **Resposta de dados em falta**

#### Caso erro no passo 4

1. Enviar **Resposta de unauthorized**

## Alteração de Senha

### Pré-requisitos

1. O usuário deve estar autenticado no sistema

### Passos

#### Caso de Sucesso

1. Deve ser chamado a api com senha atual e senha nova
2. Validar que a senha atual fornecida é valida
3. Obter dados do utilizador por email do repositório
4. Validar se a senha nova é válida
5. Converter senha nova recebida para uma hash
6. Atualizar o senha no repositório
7. Enviar **Resposta de Sucesso**

#### Caso erro no passo 2

1.  Enviar **Resposta de senha incorreta**

#### Caso erro no passo 4

1.  Enviar **Resposta de dados inválidos**

#### Caso erro no passo 6

1. Enviar **Resposta de unauthorized**
