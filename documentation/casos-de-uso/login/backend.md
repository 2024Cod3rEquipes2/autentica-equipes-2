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





