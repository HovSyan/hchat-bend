import { ModelOptions, Options } from "sequelize"

export const db_configs: Options = {
    dialect: 'mysql',
    database: 'HChat',
    username: 'root',
    password: 'qwertyuiop',
    host: '127.0.0.1',
    logging: false
    
} as const

export const model_configs: ModelOptions = {
    freezeTableName: true,
    initialAutoIncrement: '1',
    updatedAt: false,
    createdAt: false
}