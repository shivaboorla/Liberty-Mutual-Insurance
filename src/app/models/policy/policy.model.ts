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
