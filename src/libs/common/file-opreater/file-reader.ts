import { readFile as fileReader, readFileSync as fileReaderSync } from 'fs-extra';

const readFile = async (filePath: string) => fileReader(filePath);

const readFileSync = async (filePath: string) => fileReaderSync(filePath);

export { readFile, readFileSync };
