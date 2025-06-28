import { IsNotEmpty, IsString,IsEmail, IsOptional } from 'class-validator';

export class CreateJobDto {

    @IsNotEmpty()
    company_name: string;

    @IsNotEmpty()
    job_position: string;

    @IsOptional()
    description?: string;

    @IsNotEmpty()
    location: string;

    @IsOptional()
    salary?: string;

    @IsNotEmpty()
    job_type: string;

    @IsNotEmpty()
    experience_required: string;

    @IsOptional()
    skills?: string;

    @IsNotEmpty()
    contact_no: string;

    @IsNotEmpty()
    user_id: string;
    
}

