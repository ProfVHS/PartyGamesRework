export type AlertType = {
  message: string;
  type: 'error' | 'info' | 'warning' | 'success';
  duration?: number;
};
