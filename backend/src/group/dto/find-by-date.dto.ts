import { IsDate, IsOptional } from 'class-validator';

export class FindByDateDto {
    @IsOptional()
    @IsDate()
    startDate?: string;

    @IsOptional()
    @IsDate()
    endDate?: string;
}
