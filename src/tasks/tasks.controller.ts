import {
	Delete,
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task } from './task.module';
import { CreateTaskDto, UpdateTaskDto } from './dto';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) {}

	@Get()
	getAll(): Task[] {
		return this.tasksService.getAll();
	}

	@Get(':id')
	getOne(@Param('id') taskId): Task {
		return this.tasksService.getOne(taskId);
	}

	@Post()
	create(@Body() requestBody: CreateTaskDto): ReturnType<TasksService['add']> {
		return this.tasksService.add(requestBody);
	}

	@Patch(':id')
	update(
		@Param('id') taskId,
		@Body() requestBody: UpdateTaskDto
	): ReturnType<TasksService['update']> {
		return this.tasksService.update(taskId, requestBody);
	}

	@Delete(':id')
	delete(@Param('id') taskId): ReturnType<TasksService['delete']> {
		return this.tasksService.delete(taskId);
	}
}
