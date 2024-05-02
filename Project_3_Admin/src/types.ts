import { HttpContext, HttpHeaders, HttpParams } from "@angular/common/http";

export interface RechargePlan {
    id?: number;
    name: string;
    talkTime: number;
    textMessageNumber: number;
    dataNumberTotal: number;
    dataNumberPerDay: number;
    validity: number;
    price: number;
    description: number;
    rechargePlanTypeId: number;
    rechargePlanTypeName: string;
    operatorId: number
    operatorName: string;
}

export interface RechargePlanType {
    id?: number;
    name: string;
    description: string
}

export interface Operator {
    id?: number;
    name: string;
    description?: string;
}

export interface PaymentMethod {
    id?: number;
    name: string;
    description: string;
}

export interface ServiceType {
    id?: number;
    name: string;
    description: string;
}

export interface Users {
    id: number;
    name: string;
    password: string;
    phone: string;
    email: string;
    dob: string;
    address: string;
    isDeleted: boolean;
}

export interface Transaction {
    id: number;
    serviceName: string;
    rechargePlanName: string;
    transactionAmount: string;
    phone: string;
    isSucceeded: boolean;
    // createdAt: Date;
}

export interface Transactions {
    items: Transaction[];
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

export interface PaginationParams {
    [param: string]: string | number | boolean |ReadonlyArray<string | number |boolean>;
    page: number;
    perPage: number;
}

export interface Options {
    headers?:
      | HttpHeaders
      | {
          [header: string]: string | string[];
        };
    observe?: 'body';
    context?: HttpContext;
    params?:
      | HttpParams
      | {
          [param: string]:
            | string
            | number
            | boolean
            | ReadonlyArray<string | number | boolean>;
        };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    transferCache?:
      | {
          includeHeaders?: string[];
        }
      | boolean;
  }