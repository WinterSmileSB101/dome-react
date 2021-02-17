import path from 'path';
import { bootstrap, BootstrapModuleFactory } from '@libs/server-side/bootstrap';
import { HomeModule } from './home/home.module';
import { DemonModule } from './demon/demon.module';

const appModule = BootstrapModuleFactory.create([DemonModule, HomeModule]);
bootstrap(appModule, { rootDir: path.join(__dirname, '..') });
