import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MountainModule } from './mountain/mountain.module';
import { ClimberModule } from './climber/climber.module';
import { ClimbingGroupModule } from './climbing-group/climbing-group.module';
import { GroupMemberModule } from './group-member/group-member.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env`,
		}),
		MountainModule,
		ClimberModule,
		ClimbingGroupModule,
		GroupMemberModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
