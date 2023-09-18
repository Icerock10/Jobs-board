import { toast } from 'react-toastify';
class Toast {
  private readonly _instance: typeof toast;

  constructor() {
    this._instance = toast;
  }
  error(message: string) {
    return this._instance.error(message);
  }
  success(message: string) {
    return this._instance.success(message);
  }
  warning(message: string) {
    return this._instance.warning(message);
  }
}

export const toastService = new Toast()