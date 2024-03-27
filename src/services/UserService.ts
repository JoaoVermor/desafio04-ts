export interface User {
    name: string
    email: string
}

const db = [
    {
        name: "Joana",
        email: "joana@dio.com",
    }
]

export class UserService {
    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {

        if (!email) {
            throw new Error('Email is required');
        }
        
        const user = {
            name,
            email
        }

        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = () => {
        return this.db
    }

    DeleteUser = (name: string, email: string) =>{
        const user ={
            name,
            email
        }

        this.db = this.db.filter(user => user.email !== email && user.name !==name)
        console.log('Usuário deletado', email, name)

    }
}

