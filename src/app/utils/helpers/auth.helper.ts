import bcrypt from 'bcryptjs';

export const hashPassword = (password: string): Promise<string> => bcrypt.hash(password, 10);

export const comparePasswords = (plainPassword: string, hashedPassword: string): Promise<boolean> => bcrypt.compare(plainPassword, hashedPassword);
