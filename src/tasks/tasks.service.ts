import { Injectable, ValidationError } from '@nestjs/common';
import { nanoid } from 'nanoid';

import { getTimestamp } from '../utils';
import { Task, TaskStatus } from './task.module';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { validate } from 'class-validator';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];

	getAll(): Task[] {
		return this.tasks;
	}

	getOne(taskId: string): Task {
		return this.tasks.find(({ id }) => taskId === id);
	}

	create({ title, description }: UpdateTaskDto): Task {
		const now = getTimestamp();

		return {
			title,
			description,
			status: TaskStatus.Todo,

			id: nanoid(),
			updatedAt: now,
			createdAt: now,
			expectedAt: null,
			finishedAt: null,
		};
	}

	update(taskId: string, updateDto: UpdateTaskDto): Task | ValidationError[] {
		let errors = [];

		validate(updateDto).then((errs) => {
			errors = errs;
		});

		const taskIndex = this.tasks.findIndex(({ id }) => taskId === id);
		const now = getTimestamp();

		if (errors.length === 0 && taskIndex !== -1) {
			const task = {
				...this.tasks[taskIndex],
				...updateDto,
				updatedAt: now,
			};

			if (updateDto.status === TaskStatus.Done) task.finishedAt = now;

			this.tasks[taskIndex] = task;

			return task;
		} else {
			return taskIndex === -1
				? [{ property: 'taskId', value: taskId }]
				: errors;
		}
	}

	add(createDto: CreateTaskDto): Task | ValidationError[] {
		let errors = [];

		validate(createDto).then((errs) => {
			errors = errs;
		});

		const task = errors.length === 0 && this.create(createDto);

		if (task) {
			this.tasks.push(task);

			return task;
		} else {
			return errors;
		}
	}

	delete(taskId: string): Record<string, string | boolean> {
		const index = this.tasks.findIndex(({ id }) => id === taskId);

		if (index !== -1) {
			this.tasks.splice(index, 1);

			return { status: true, message: 'task deleted successfully' };
		} else {
			return { status: false, message: 'task not found' };
		}
	}
}
