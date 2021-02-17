import { Module } from '@nestjs/common';
import MachineInfoController from './controllers/machine-info-page.controller';

@Module({
    controllers: [MachineInfoController],
    imports: [],
    providers: [],
})
export class DemonModule {}
