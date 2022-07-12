class Responses {
	static async success(res, message, data) {
		res.status(200).json({
			code: "Success",
			message,
			data: data || {},
		});
	}

	static async created(res, message, data) {
		res.status(201).json({
			code: "Created",
			message,
			data: data || {},
		});
	}

	static async badRequest(res, code, message) {
		res.status(400).json({
			code,
			message,
		});
	}

	static async unauthorized(res) {
		res.status(401).json({
			code: "Unauthorized",
			message: "Unauthorized",
		});
	}

	static async notFound(res, message) {
		res.status(404).json({
			code: "NotFound",
			message,
		});
	}

	static async forbidden(res, message) {
		res.status(403).json({
			code: "Forbidden",
			message,
		});
	}

	static async conflict(res, message) {
		res.status(409).json({
			code: "Conflict",
			message,
		});
	}

	static async internalServerError(res) {
		res.status(500).json({
			code: "InternalServerError",
			message:
				"An error occured on the server, Please refer back to the backend development team.",
		});
	}
}

export default Responses;
