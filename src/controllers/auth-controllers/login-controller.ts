import { Request, Response, NextFunction } from "express";
import { userMongoService } from "../../mongo/auth/service";
import { comparePassword } from "../../utils/bcrypt";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    // validate the user in database
    const user = await userMongoService.getUserByEmail({
      email: body.email,
    });
    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordCorrect = await comparePassword({
      hashedPassword: user.password,
      plainTextPassword: body.password,
    });

    if (!isPasswordCorrect) {
      res.status(400).json({
        message: `Incorrect email or password`,
      });
      return;
    }

    res.status(200).json({
      message: "you are logged in successfully!!",
    });
  } catch (error) {
    console.error("Failed to signup", error);
    next(error);
  }
}
