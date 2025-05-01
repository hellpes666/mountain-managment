export class AppError extends Error {
	constructor(
		public readonly code: string,
		message: string,
		public readonly metadata?: Record<string, unknown>
	) {
		super(message);
		this.name = this.constructor.name;
	}
}

export class ValidationError extends AppError {
	constructor(message: string, metadata?: Record<string, unknown>) {
		super("VALIDATION_ERROR", message, metadata);
	}
}
