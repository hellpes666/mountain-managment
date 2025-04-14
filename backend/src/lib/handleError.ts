import { Response } from "express";

type ErrorHandlerParams = {
	res: Response;
	error: unknown;
	component: string;
	customStatusError?: number;
	customResponseAnswer?: string;
	metadata?: Record<string, unknown>;
};

type ErrorResponse = {
	success: false;
	error: {
		code: string;
		message: string;
		timestamp: string;
		component?: string;
		metadata?: Record<string, unknown>;
	};
};

const normalizeError = (error: unknown): { message: string; code: string } => {
	if (error instanceof Error) {
		return {
			message: error.message,
			code: error.name || "UNKNOWN_ERROR",
		};
	}

	if (typeof error === "string") {
		return {
			message: error,
			code: "CUSTOM_ERROR",
		};
	}

	return {
		message: "Произошла непредвиденная ошибка",
		code: "INTERNAL_SERVER_ERROR",
	};
};

export const handleError = ({
	res,
	error,
	component,
	customResponseAnswer,
	customStatusError,
	metadata,
}: ErrorHandlerParams): Response => {
	const timestamp = new Date().toISOString();
	const statusCode = customStatusError || 500;

	const { message, code } = normalizeError(error);

	console.error(
		`[${timestamp}] ERROR in ${component}:`,
		JSON.stringify(
			{
				code,
				message,
				statusCode,
				component,
				metadata,
				stack: error instanceof Error ? error.stack : undefined,
			},
			null,
			2
		)
	);

	const errorResponse: ErrorResponse = {
		success: false,
		error: {
			code,
			message: customResponseAnswer || message,
			timestamp,
			metadata,
		},
	};

	if (res.headersSent) {
		console.error(`[${timestamp}] Ответ уже отправлен для ${component}`);
		return res;
	}

	return res
		.status(statusCode)
		.header("X-Error-Code", code)
		.json(errorResponse);
};
