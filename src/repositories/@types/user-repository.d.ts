import { Prisma, User } from "@prisma/client";


// Criando uma interface que sempre vai ser seguida mesmo que troquemos o ORM, 
// fazendo assim com que o services não precise ser atrelado ao PRISMA REPOSITORY.
export interface UsersRepository{
    create(data: Prisma.UserCreateInput): Promise<User>
    findByEmail(email: string): Promise<User | null>,
    findById(id: string): Promise<User | null>
}