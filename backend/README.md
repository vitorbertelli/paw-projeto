# Orçamento familiar

## Sobre

O objetivo do projeto foi desenvolver uma central que auxiliasse no controle fianaceiro. A aplicação se resume na criação de receitas e despesas. É possível também a visualização de um resumo mensal segundo os lucros e gastos listados na API.

## Getting Started

### Executar localmente

* Instalar as dependências necessárias
```
npm install
```

* Rodar o projeto seu servidor localhost
```
npm run dev
```

## Endpoints

| Method | Route                           | Body Params                                  |
|--------|---------------------------------|----------------------------------------------|
| GET    | /despesas                       | -                                            |
| POST   | /despesas                       | {'descricao', 'valor', 'data'}               |
| DELETE | /despesas/{id}                  | -                                            |
| GET    | /despesas/{ano}/{mes}           | -                                            |
| GET    | /receitas                       | -                                            |
| POST   | /receitas                       | {'descricao', 'valor', 'data'}               |
| DELETE | /receitas/{id}                  | -                                            |
| GET    | /receitas/{ano}/{mes}           | -                                            |
| GET    | /resumo/{ano}/{mes}             | -                                            |
