# App

GymPass style app

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizados pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail e/ou cpf duplicado
- [x] O usuário não pode fazer 2 check-ins nom mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver a pelo menos 100m da academia;
- [x] O check-in só pode ser validado até 20 minutos após criado;
- [X] O check-in só pode ser validado por administradores;
- [X] A academia só pode ser cadastrada por administradores;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa ser criptografada;
- [x] Os dados da aplicação	precisam ser persistidos no postgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por pag;
- [x] O usuário deve ser identificado por um JWT;