# Meu MVP - Terminal de triagem

Este projeto consiste em um protótipo de um terminal de triagem para classificação de risco de um hospital.
Onde o paciente chegaao hospital, 
informa o seus dados no terminal, 
o sistema encontra o paciente na base, 
e então, um enfermeiro realizará um atendimento para classifica-lo na ordem, seguindo alguns protocolo de enfermagem.

Obs: Devido ao fato de este sistema ser apenas um protótipo, a classificação é gerada de modo randomico.
---
## Como executar 


Será necessário ter todas as libs python listadas no `requirements.txt` instaladas.
Após clonar o repositório, é necessário ir ao diretório raiz, pelo terminal, para poder executar os comandos descritos abaixo.

> É fortemente indicado o uso de ambientes virtuais do tipo [virtualenv](https://virtualenv.pypa.io/en/latest/installation.html).

```
(env)$ pip install -r requirements.txt
```

Este comando instala as dependências/bibliotecas, descritas no arquivo `requirements.txt`.

Para executar a API  basta executar:

```
(env)$ flask run --host 0.0.0.0 --port 5000
```

Em modo de desenvolvimento é recomendado executar utilizando o parâmetro reload, que reiniciará o servidor
automaticamente após uma mudança no código fonte. 

```
(env)$ flask run --host 0.0.0.0 --port 5000 --reload
```

Abra o [http://localhost:5000/#/](http://localhost:5000/#/) no navegador para verificar o status da API em execução.
