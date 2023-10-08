import { database } from "./src/db";
import { server } from "./src/server";

(async () => {
    await database.init();
    await server.init();
})();