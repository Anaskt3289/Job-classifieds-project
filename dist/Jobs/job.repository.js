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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const job_schema_1 = require("./schemas/job.schema");
let JobRepository = class JobRepository {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async findOne(userFilterQuery) {
        return await this.jobModel.findOne(userFilterQuery);
    }
    async find(filterQuery) {
        return await this.jobModel.find(filterQuery).sort({ _id: -1 });
    }
    async create(data) {
        const newUser = new this.jobModel(data);
        return await newUser.save();
    }
    async findOneAndUpdate(filterQuery, data) {
        return await this.jobModel.findOneAndUpdate(filterQuery, data);
    }
    async findWithPagination(filterQuery, skip, limit) {
        return await this.jobModel.find(filterQuery).sort({ _id: -1 }).skip(skip).limit(limit);
    }
    async count(filterQuery) {
        return await this.jobModel.countDocuments(filterQuery);
    }
};
JobRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Jobs.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], JobRepository);
exports.JobRepository = JobRepository;
//# sourceMappingURL=job.repository.js.map