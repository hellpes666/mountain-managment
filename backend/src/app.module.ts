import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MountainModule } from './mountain/mountain.module';
import { ClimberModule } from './climber/climber.module';
import { ClimbingGroupModule } from './climbing-group/climbing-group.module';
import { GroupMemberModule } from './group-member/group-member.module';
import { DatabaseModule } from './db/database.module';
import { EmergencyContactsModule } from './emergency-contacts/emergency-contacts.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		DatabaseModule,
		MountainModule,
		ClimberModule,
		ClimbingGroupModule,
		GroupMemberModule,
		EmergencyContactsModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
