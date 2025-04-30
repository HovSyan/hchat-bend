import { ModelOptions, Options } from "sequelize"

/*
    This will be moved to .env, it is just here for demonstration purposes
*/
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

export const assets_configs = {
    avatarsPath: __dirname + '/avatars',
} as const;
