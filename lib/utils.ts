import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RetryOptions {
  maxRetries: number;
  initialDelay: number;
  maxDelay: number;
  factor: number;
  onRetry?: (attempt: number, error: Error) => void;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: Partial<RetryOptions> = {}
): Promise<T> {
  const {
    maxRetries = 3,
    initialDelay = 1000,
    maxDelay = 10000,
    factor = 2,
    onRetry = () => {},
  } = options;

  let attempt = 0;
  let delay = initialDelay;

  while (true) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      
      if (attempt >= maxRetries) {
        throw error;
      }
      
      if (error instanceof Error) {
        onRetry(attempt, error);
      }
      
      await new Promise(resolve => setTimeout(resolve, delay));
      
      delay = Math.min(delay * factor, maxDelay);
    }
  }
}

export function formatErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    if (error.message.includes('fetch')) {
      return 'Error de conexión. Por favor, verifica tu conexión a internet.';
    }
    
    if (error.message.includes('timeout')) {
      return 'La solicitud ha tardado demasiado. Por favor, inténtalo de nuevo.';
    }
    
    if (error.message.includes('API')) {
      return 'Error en el servicio. Estamos trabajando para solucionarlo.';
    }
    
    return error.message;
  }
  
  return 'Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.';
} 