import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): object {
    // return 'Hello World!';
    return {
      message: 'Hello World!',
    };
  }
}
