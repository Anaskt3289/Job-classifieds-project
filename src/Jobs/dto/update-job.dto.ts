import { IsNotEmpty, IsString,IsEmail, IsOptional } from 'class-validator';

export class UpdateJobDto {

    @IsNotEmpty()
    job_id: string;

    @IsOptional()
    company_name?: string;

    @IsOptional()
    job_position?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    location?: string;

    @IsOptional()
    salary?: string;

    @IsOptional()
    job_type?: string;

    @IsOptional()
    experience_required?: string;

    @IsOptional()
    skills?: string;

    @IsOptional()
    contact_no?: string;

    @IsNotEmpty()
    user_id: string;
    
}