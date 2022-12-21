import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation.entity';
import { Tree } from 'src/tree.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    //Databases credentials should be stored in an environment file and not pushed to a public repository
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'christmas_tree',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Tree, Reservation]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
