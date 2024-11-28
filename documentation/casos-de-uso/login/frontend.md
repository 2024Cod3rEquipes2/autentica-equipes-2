## UI

### Passos
#### Caso de Sucesso
1. Utilizador deve escrever um email e senha
2. Utilizador de clicar no botão login
3. Validar que email e senha estão preenchidos
4. Fazer pedido ao servidor com **Request servidor**
5. Tratar resposta
6. Redirecionar para a pagina principal


#### Caso de erro passo 3
1. Deve mostrar mensagem de erro nos campos em falta


#### Caso de erro 400 passo 5
1. Deve mostrar mensagem genérica de erro com a informação enviada pelo servidor


#### Caso de erro 500 passo 5
1. Deve mostrar mensagem genérica de erro com informação de que algo inesperado aconteceu e que deve tentar mais tarde ou contactar o administrador

#### Caso de erro 401 passo 5
1. Deve mostrar mensagem genérica de erro com informação "Credenciais invávlidas"