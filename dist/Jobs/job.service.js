"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const job_repository_1 = require("./job.repository");
let JobService = class JobService {
    constructor(jobRepository) {
        this.jobRepository = jobRepository;
    }
    async createJob(job_data) {
        try {
            let newJob = await this.jobRepository.create(Object.assign(Object.assign({}, job_data), { created_by: job_data.user_id }));
            return {
                status: 1,
                message: "Job created successfully",
                resultSet: newJob
            };
        }
        catch (err) {
            console.log("error in createJob function >>>", err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to register the job.', err.status || 0);
        }
    }
    async updateJob(job_data) {
        try {
            let update_data = {};
            if (job_data === null || job_data === void 0 ? void 0 : job_data.company_name)
                update_data['company_name'] = job_data.company_name;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.job_position)
                update_data['job_position'] = job_data.job_position;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.description)
                update_data['description'] = job_data.description;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.location)
                update_data['location'] = job_data.location;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.salary)
                update_data['salary'] = job_data.salary;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.job_type)
                update_data['job_type'] = job_data.job_type;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.experience_required)
                update_data['experience_required'] = job_data.experience_required;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.skills)
                update_data['skills'] = job_data.skills;
            if (job_data === null || job_data === void 0 ? void 0 : job_data.contact_no)
                update_data['contact_no'] = job_data.contact_no;
            if (job_data.user_id)
                update_data['updated_by'] = job_data.user_id;
            await this.jobRepository.findOneAndUpdate({ _id: job_data === null || job_data === void 0 ? void 0 : job_data.job_id }, Object.assign({}, update_data));
            return {
                status: 1,
                message: "Successfully updated job details"
            };
        }
        catch (err) {
            console.log('error in updateJob function >>>', err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to update job details.', err.status || 0);
        }
    }
    async fetchJobs(filters) {
        try {
            let { location, search_term, user_id, page_no, limit } = filters;
            if (!page_no)
                page_no = 1;
            if (!limit)
                limit = 10;
            const skip = (page_no - 1) * limit;
            const criteria = {
                is_deleted: false
            };
            if (location)
                criteria.location = location;
            if (search_term) {
                const regex = new RegExp(search_term, 'i');
                criteria.$or = [
                    { company_name: regex },
                    { job_position: regex },
                    { location: regex },
                    { job_type: regex },
                    { skills: regex }
                ];
            }
            if (user_id)
                criteria.created_by = user_id;
            const total_records = await this.jobRepository.count(criteria);
            const job_details = await this.jobRepository.findWithPagination(Object.assign({}, criteria), skip, limit);
            if (job_details === null || job_details === void 0 ? void 0 : job_details.length) {
                return {
                    status: 1,
                    message: `${job_details === null || job_details === void 0 ? void 0 : job_details.length} recods found.`,
                    resultSet: job_details,
                    total_records,
                    total_pages: Math.ceil(total_records / limit),
                };
            }
            else {
                throw new common_1.NotFoundException('No records found.');
            }
        }
        catch (err) {
            console.log('error in updateJob function >>>', err);
            throw new common_1.HttpException((err.response && err.response.message) || err.message || 'Failed to fetch job.', err.status || 0);
        }
    }
};
JobService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [job_repository_1.JobRepository])
], JobService);
exports.JobService = JobService;
//# sourceMappingURL=job.service.js.map