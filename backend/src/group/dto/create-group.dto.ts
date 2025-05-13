import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    IsUUID,
    Length,
    Matches,
    Validate,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

// Проверка, что год >= 2024
@ValidatorConstraint({ name: 'MinYear', async: false })
class MinYearConstraint implements ValidatorConstraintInterface {
    validate(dateStr: string) {
        const [day, month, year] = dateStr.split(' ')[0].split('-').map(Number);
        return year >= 2024;
    }
    defaultMessage(args: ValidationArguments) {
        return 'Год начала должен быть не меньше 2024';
    }
}

// Проверка, что endDate >= startDate
@ValidatorConstraint({ name: 'EndAfterStart', async: false })
class EndAfterStartConstraint implements ValidatorConstraintInterface {
    validate(endDateStr: string, args: ValidationArguments) {
        const obj = args.object as any;
        if (!endDateStr || !obj.startDate) return true;
        const parse = (str: string) => {
            const [d, m, y] = str.split(' ')[0].split('-').map(Number);
            const [h, min] = str.split(' ')[1].split(':').map(Number);
            return new Date(y, m - 1, d, h, min);
        };
        return parse(endDateStr) >= parse(obj.startDate);
    }
    defaultMessage(args: ValidationArguments) {
        return 'Дата окончания не может быть раньше даты начала';
    }
}

export class CreateGroupDto {
    @ApiProperty({ example: 'Экспедиция на Эверест', minLength: 4, maxLength: 32 })
    @IsString()
    @Length(4, 32)
    readonly name: string;

    @ApiPropertyOptional({ example: '15-06-2025 08:00', description: 'Формат: DD-MM-YYYY HH:MM' })
    @IsString()
    @IsOptional()
    @Matches(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/, {
        message: 'Дата начала должна соответствовать формату: DD-MM-YYYY HH:MM',
    })
    @Validate(MinYearConstraint)
    readonly startDate: string;

    @ApiPropertyOptional({ example: '30-06-2025 18:00', description: 'Формат: DD-MM-YYYY HH:MM' })
    @IsString()
    @Matches(/^\d{2}-\d{2}-\d{4} \d{2}:\d{2}$/, {
        message: 'Дата окончания должна соответствовать формату: DD-MM-YYYY HH:MM',
    })
    @IsOptional()
    @Validate(EndAfterStartConstraint)
    readonly endDate: string;

    @ApiProperty({ example: 'a3d2c9c4-1234-4567-89ab-cdef12345678' })
    @IsUUID('4')
    readonly mountainId: string;
}
