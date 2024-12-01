
**Resposta de Sucesso**
``` 
{
	"status": 200
	"data" : {
		usuario_id: "guid",
		token: "algum_token"
	}
}
```


**Resposta de dados em falta**
``` 
{
	"status": 400 - bad Request
	"data" : {
		error: "Parametros em falta"
	}
}
```

**Resposta de unauthorized**
``` 
{
	"status": 401
	"data" : {
		error: "Credenciais inválidas"
	}
}
```

**Resposta de erro de servidor**
``` 
{
	"status": 500
	"data" : {
		error: "Erro inesperado. Tente novamente mais tarde ou contate o administrador do sistema."
	}
}
```


**Request servidor**
``` 
{
	"method": "POST"
	"body" : {
		"email": "algum_email",
		"password": "alguma_password",
	}
}
```