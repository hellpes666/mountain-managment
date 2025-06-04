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
        const [year] = dateStr.split('-').map(Number);
        return year >= 2024;
    }

    defaultMessage() {
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
            const [y, m, d] = str.split('-').map(Number);
            return new Date(y, m - 1, d);
        };

        return parse(endDateStr) >= parse(obj.startDate);
    }

    defaultMessage() {
        return 'Дата окончания не может быть раньше даты начала';
    }
}

export class CreateGroupDto {
    @ApiProperty({ example: 'Экспедиция на Эверест', minLength: 4, maxLength: 32 })
    @IsString()
    @Length(4, 32)
    readonly name: string;

    @ApiPropertyOptional({ example: '2025-06-05', description: 'Формат: YYYY-MM-DD' })
    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Дата начала должна соответствовать формату: YYYY-MM-DD',
    })
    @Validate(MinYearConstraint)
    readonly startDate: string;

    @ApiPropertyOptional({ example: '2025-06-30', description: 'Формат: YYYY-MM-DD' })
    @IsString()
    @IsOptional()
    @Matches(/^\d{4}-\d{2}-\d{2}$/, {
        message: 'Дата окончания должна соответствовать формату: YYYY-MM-DD',
    })
    @Validate(EndAfterStartConstraint)
    readonly endDate: string;

    @ApiProperty({ example: 'a3d2c9c4-1234-4567-89ab-cdef12345678' })
    @IsUUID('4')
    readonly mountainId: string;
}
