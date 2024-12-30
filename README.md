# App 

GymPass style app.

## RFs (Requisitos funcionais)

- [X] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfíl de um usuário logado;
- [ ] Deve ser possível obter o número de checkins realizados pelo usuário logado;
- [ ] Deve ser possível o usuário obter seu histórico de checkins;
- [ ] Deve ser possível o usuário buscar academias próximas (até 10km);
- [ ] Deve ser possível o usuário buscar academias pelo nome;
- [ ] Deve ser possível o usuário realizar checkin em um academia;
- [ ] Deve ser possível validar o checkin de um usuário;
- [ ] Deve ser possível cadastrar uma academia;

## RN (Requisitos de negócio) 'Devem estar sempre atreladas a um requisito funcional'

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode fazer dois checkins no mesmo dia;
- [ ] O usuário não pode fazer check-in se estiver perto (100m) da academia;
- [ ] O check-in somente poderá ser validado até 20 minutos após ser criado;
- [ ] O check-in somente poderá ser validade por administradores;
- [ ] A academia somente poderá ser cadastrada por administradores;

## RNs (Requisitos não funcionais) 'Requisitos que não partem do cliente, requisitos mais técnicos. Qual BD vou utiliza, qual estratégia de cache.'

- [X] A senha do usuário precisa estar criptografa;
- [X] Os dados da aplicação precisam estar persistidos em um BD PostgreSQL;
- [ ] Todas as listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT (Jason Web Token);