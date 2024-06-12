import { Prisma, User } from "@prisma/client";
import { UsersRepository } from "../@types/user-repository";
import { randomUUID } from "crypto";

interface dbProps {
    user: User[],
}

export class InMemoryUserRepository implements UsersRepository {
    private db: dbProps = {
        user: []
    };

    async create({name, email, password_hash}: Prisma.UserCreateInput){
        const userData = {
            id: randomUUID(),
            created_at: new Date(),
            name,
            email,
            password_hash
        }

        this.db.user.push(userData);

        return userData;
    }
    async findByEmail(email: string) {
        const user = this.db.user.find(user => user.email === email);

        if(!user){
            return null
        }

        return user
    }

    async findById(id: string) {
        const user = this.db.user.find(user => user.id === id);

        if(!user){
            return null
        }

        return user
    }
}