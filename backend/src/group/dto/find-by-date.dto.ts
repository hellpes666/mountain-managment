import { IsDate, IsNotEmpty, IsOptional } from "class-validator";

export class FindByDateDto {
    @IsNotEmpty()
    @IsDate()
    startDate: string 
    
    @IsOptional()
    @IsDate()
    endDate?: string 
}