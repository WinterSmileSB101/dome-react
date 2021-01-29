import { bootstrap, BootstrapModuleFactory } from '@libs/server-side/bootstrap';
import { HomeModule } from './home/home.module';

const appModule = BootstrapModuleFactory.create([HomeModule]);
bootstrap(appModule);
