export interface PolicyResponse {
  message: string;
  data: {
    username: string;
    role: string;
    policyNumber: string;
    validTill: string;
  };
}

export interface DashboardResponse {
  message: string;
  data: any;
}

export interface policyDetails {
  message: string;
  data: Item[];
}

export interface Item {
  _id?: string;
  policyNumber: string;
  customerId: string;
  policyType: string;
  status: string;
  createdAt?: Date;
}
