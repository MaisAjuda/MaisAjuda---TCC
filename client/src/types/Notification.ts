
export interface Notification {
    name: string;
    type: string;
    location: string;
    status: 'accept' | 'reject';
  }