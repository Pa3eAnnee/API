import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authUser = (req: Request, res: Response, next: NextFunction) => {
	const privateKey = process.env.JWT_SECRET ?? "secret";

	const authHeader = req.headers["authorization"];
	if (!authHeader) return res.status(401).json({ error: "Unauthorized" });
	const token = authHeader.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Unauthorized" });

	jwt.verify(token, privateKey, (err, user) => {
		if (err) return res.status(403).json({ error: "Access Forbidden" });
		(req as any).user = user;
		next();
	});
};
