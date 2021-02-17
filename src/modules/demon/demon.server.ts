import { bootstrap, BootstrapModuleFactory } from '@libs/server-side/bootstrap';
import { DemonModule } from './demon.module';

const demonModule = BootstrapModuleFactory.create([DemonModule]);

bootstrap(demonModule);
