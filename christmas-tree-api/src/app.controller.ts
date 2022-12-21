import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';

const MOCK_TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// This controller mocks the whole micro-service architecture
// If this was a real micro-service project /users, /trees and /payments route
// should be exposed by different servers

// This is a mocked behavior for token check. This should never be used in production
const mockTokenGuard = (token) => {
  if (token !== MOCK_TOKEN) {
    throw new HttpException('Unauthorized', 401);
  }
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/users/login')
  login(@Body() { username, password }) {
    // This is a mocked behaviour. This should never be used in production
    if (username === 'Santa' && password === 'Xmas') {
      return {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      };
    }
    throw new HttpException('Authentication failure', 401);
  }

  @Get('/trees')
  fetchTrees(@Headers('Authorization') auth: string) {
    mockTokenGuard(auth);
    return this.appService.getTrees();
  }

  @Get('trees/:id')
  fetchTreeById(
    @Headers('Authorization') auth: string,
    @Param() { id: treeId },
  ) {
    mockTokenGuard(auth);
    return this.appService.getTreeById(Number(treeId));
  }

  @Post('payments/reservations')
  async createReservation(
    @Headers('Authorization') auth: string,
    @Body() { treeId },
  ) {
    mockTokenGuard(auth);
    await this.appService.createReservation(treeId);
  }

  @Patch('payments/reservations/status')
  async updateReservation(
    @Headers('Authorization') auth: string,
    @Body() { status, treeId },
  ) {
    mockTokenGuard(auth);
    await this.appService.updateReservationStatus(status, treeId);
  }

  @Get('payments/reservations')
  fetchReservation(@Headers('Authorization') auth: string) {
    mockTokenGuard(auth);
    return this.appService.getReservations();
  }
}
