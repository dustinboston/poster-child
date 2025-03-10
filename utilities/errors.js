export const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("An unexpected error occurred.");
};

export default errorHandler;
