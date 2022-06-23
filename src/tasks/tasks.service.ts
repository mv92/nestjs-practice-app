import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.module';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	getAll(): Task[] {
		return this.tasks;
	}

	getOne(taskId: string): Task {
		return this.tasks.find(({ id }) => taskId === id);
	}

	create(title: Task['title'], description: Task['description']): Task {
		const date = new Date();
		const id = date.getTime().toString(16);
		const now = date.toISOString();

		const task: Task = {
			title,
			description,
			status: TaskStatus.Todo,

			id,
			updatedAt: now,
			createdAt: now,
		};

		this.tasks.push(task);

		return task;
	}
}
