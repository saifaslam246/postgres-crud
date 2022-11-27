import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Photo, User } from './user/models/post.entity';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    MulterModule.register({dest:'./uploads'}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(<string>process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      autoLoadEntities:true,
      synchronize:true,
      entities: [User,Photo],
    }),
    UserModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'} 
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
