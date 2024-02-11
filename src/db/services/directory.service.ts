import fs from 'fs';

class FsService {
    createDirIfNotExists(dirname: string): Promise<void> {
        return new Promise(res => fs.mkdir(dirname, {}, () => res()));
    }
}

export const fsService = new FsService();