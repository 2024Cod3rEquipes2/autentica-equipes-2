## Passo a passo a implementar na tela de login/cadastro:

- Poderá ser 1 tela para login e cadastro, alternando entre o modo "LOGIN" e "CADASTRO"

### CADASTRO

1. Implementar layout de cadastro
2. **Botao Cadastrar** ->Valida dados e envia dados para a função responsável por chamar a API()
3. Validar todos os campos antes de submeter o formulario
   - Validar campos obrigatórios vazios
   - Validar campo email válido (@)
   - Validar senha forte (min. 6 caracteres)
   - Validar confirmar senha
4. Tratar possiveis retornos da API (Sucesso, erro)
5. Em caso de sucesso, mostre mensagem de sucesso e voltar para modo "login"
6. Botao voltar, mudar modo para "LOGIN"

### LOGIN

1. Implementar layout login
2. Validar campos email / senha antes de submeter o formulario
   - Validar campos vazios
   - Validar campo email válido (@)
   - Validar senha forte (min. 6 caracteres)
3. Enviar dados para a função responsável por chamar a API()
4. Tratar possiveis retornos da API (Sucesso, erro)
5. Opção para cadastrar-se mudar modo para "CADASTRO"
6. Em caso de sucesso, salvar o token retornado da API em um cookie (sessao) e redirecionar para a Pagina principal da aplicação
