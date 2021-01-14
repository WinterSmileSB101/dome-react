import { Module } from '@nestjs/common';
import { HomePageController } from './controllers/home-page.controller';

@Module({
    controllers: [HomePageController],
    imports: [],
    providers: [],
})
export class HomeModule {}
