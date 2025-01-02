import type { IPagination } from "~/types/IPagination";

export interface IApplication {
  id: string;
  fullName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  status: ApplicationStatus;
  createdAt: string;
  open?: boolean;
}

enum ApplicationStatus {
  NEW = "new",
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

export interface IApplicationsList {
  data: IApplication[];
  pagination: IPagination;
}
