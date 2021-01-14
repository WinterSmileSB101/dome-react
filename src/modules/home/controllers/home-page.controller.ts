import { Controller, Get } from '@nestjs/common';

@Controller()
export class HomePageController {
    @Get('home')
    public async Home() {
        return 'hahahah';
    }
}
