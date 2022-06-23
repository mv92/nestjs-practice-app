import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TasksService } from './tasks.service';
import { Task, TaskCreateRequest } from './task.module';

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
	create(
		@Body() { title, description }: TaskCreateRequest
	): ReturnType<TasksService['create']> {
		return this.tasksService.create(title, description);
	}
}
