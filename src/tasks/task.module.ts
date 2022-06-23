export interface Task {
	id: string;

	title: string;
	description: string;
	status: `${TaskStatus}`;

	/**
	 * expected "deadline". allowed to update but not allowed to be set to a date before createdAt
	 */
	expectedAt: string | undefined;
	/**
	 * update only when move to Done
	 */
	finishedAt: string | undefined;
	/**
	 * task creation timestamp, do not update, ever.
	 */
	createdAt: string;
	/**
	 * update with every change
	 */
	updatedAt: string;
}

export enum TaskStatus {
	Backlog = 'backlog',
	Todo = 'todo',
	InProgress = 'in-progress',
	Done = 'done',
	Cancelled = 'cancelled',
}
