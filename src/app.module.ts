import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { CurrentUserMiddleware } from './utility/middlewares/current-user.middleware';

@Module({
  imports: [UserModule, TypeOrmModule.forRoot(dataSourceOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
