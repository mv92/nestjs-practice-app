import {
	IsEnum,
	IsNotEmpty,
	IsOptional,
	MaxLength,
	MinLength,
} from 'class-validator';
import { Task, TaskStatus } from './task.module';

export class UpdateTaskDto {
	@IsOptional()
	@MinLength(2)
	@MaxLength(64)
	title?: Task['title'];

	@IsOptional()
	@IsNotEmpty()
	@MaxLength(255)
	description?: Task['description'];

	@IsOptional()
	@IsEnum(TaskStatus)
	status?: Task['status'];

	@IsOptional()
	@IsNotEmpty()
	expectedAt?: Task['expectedAt'];

	@IsOptional()
	finishedAt?: Task['finishedAt'];
}

export class CreateTaskDto extends UpdateTaskDto {
	@MinLength(2)
	@MaxLength(64)
	title: Task['title'];
}
