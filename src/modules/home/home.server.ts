import { bootstrap, BootstrapModuleFactory } from '@libs/server-side/bootstrap';
import { HomeModule } from './home.module';

const homeModule = BootstrapModuleFactory.create([HomeModule]);

bootstrap(homeModule);
