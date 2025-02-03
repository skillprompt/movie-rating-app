import { genSalt, hash } from "bcryptjs";

export async function hashPassword(plainTextPassword: string) {
  try {
    const salt = await genSalt(10);
    const hashedPassword = await hash(plainTextPassword, salt);
    return hashedPassword;
  } catch (error) {
    console.error(error);
    throw new Error("Hashing password failed");
  }
}
