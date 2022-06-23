export interface Task {
	id: string;

	title: string;
	description: string;
	status: TaskStatus;

	createdAt: string;
	updatedAt: string;
}

export enum TaskStatus {
	Backlog = 'Backlog',
	Todo = 'Todo',
	InProgress = 'InProgress',
	Done = 'Done',
}

export interface TaskCreateRequest {
	title: Task['title'];
	description: Task['description'];
}
