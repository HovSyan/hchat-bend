import { Logger } from "../utils/logger";
import { sequelize } from "./services/db.service";
import { generateTables } from "./models";
import { fsService } from "./services/directory.service";
import { assets_configs } from "./configs";

class Database {
    private logger = new Logger();

    async init(): Promise<void> {
        try {
            this.logger.log('Connecting to DB...')
            await sequelize.authenticate();
            this.logger.logln(' ✅');

            this.logger.log('Generating tables...');
            await generateTables();
            this.logger.logln(' ✅');

            this.logger.log('Checking avatars directory to be ready...')
            await fsService.createDirIfNotExists(assets_configs.avatarsPath);
            this.logger.logln(' ✅');
            
            this.logger.logln('Done!');
        } catch(e: unknown) {
            this.logger.logln('Error while processing the database: ', e)
        }
    }
}

export const database = new Database();