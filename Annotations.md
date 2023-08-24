## Layer Infra
-> camada externa da aplicação
-> database, rotas, controllers...

## Layer Domain
-> camada interna da aplicação
-> regras de negócio, entidades, useCases...

---

Date | Undefined | Null
-> Ao criar uma notificação, a data de leitura não é setada, logo, ela é undefined. Quando o usuário lê a notificação, ela pode possuir uma data de leitura. Contudo, nessa atualização, pode ser que ainda não exista uma data de leitura, logo, ela é null.

---

## Layer Data
-> camada de persistência de dados
-> repositories, models, migrations...

---

## Layer Presentation
-> camada de apresentação
-> views, controllers, routes...

---

## Layer Main
-> camada de inicialização da aplicação
-> server, database, routes...

---

## Layer Utils
-> camada de utilidades
-> funções que podem ser utilizadas em qualquer lugar da aplicação

---

## Use Cases
-> são as regras de negócio da aplicação
-> são os casos de uso da aplicação

# Mappers
-> são funções que transformam um objeto em outro objeto (ex: de um model para um DTO)
-> ex: 
```ts
/**
 * Mapper para transformar uma notificação em uma notificação do prisma
 * recebe uma notificação e retorna uma notificação do prisma
 */
export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readtAt: notification.readAt,
      createdAt: notification.createdAt,
    };
  }
}
```