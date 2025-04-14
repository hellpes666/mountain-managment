import mongoose from "mongoose";

export const DbConnect = async () => {
	try {
		if (!process.env.MONGODB_URI) {
			console.log("Нет ключа");
			return;
		}
		const conn = await mongoose.connect(process.env.MONGODB_URI as string);

		console.log("MongoDB connected: " + conn.connection.host);
	} catch (error) {
		console.log(error);
		return;
	}
};
