## Caso de Sucesso
### 1º fase  - Criacão do token de recuperação
1. Deve ser chamado a api com email
2. Validar que o email fornecido é válido (presente na base de dados)
3. Criar um token de recuperação de senha com email ou id de utilizador encriptados
4. Enviar um email com o token para o usuário

### 2ª fase - Mudança de password
1. Receber token de recuperação, e nova password
2. Validar que o token recebido é válido (expirou, tem a estrutura correta...)
3. Validar que password cumpre os requisitos
4. Desencriptar o token para obter email ou id do utilizador
5. Obter o utilizador por email ou id
6. Validar que utilizador existe
7. Redefinir senha
8. Enviar email de confirmação
9. Enviar **Resposta de Sucesso**

#### Caso erro no passo 1

1.  **A definir**

#### Caso erro no passo 5

1. Enviar **Resposta de token inválido**



http://localhost:3000/recuperacaoSenha?token=algumToken

nova password
confirmar nova password
submit