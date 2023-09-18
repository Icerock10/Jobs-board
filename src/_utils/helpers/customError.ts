export const createCustomError = (message: string, status: number): Error => {
  const error = new Error(message) as Error & { status: number };
  error.status = status;
  throw error
}