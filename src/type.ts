import { HttpContext, HttpHeaders } from '@angular/common/http';

export interface Options {
    headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
    };
    observe?: 'body';
    context?: HttpContext;
    //   params?:
    //     | HttpParams
    //     | {
    //         [param: string]:
    //           | string
    //           | number
    //           | boolean
    //           | ReadonlyArray<string | number | boolean>;
    //       };
    reportProgress?: boolean;
    responseType?: 'json';
    //   withCredentials?: boolean;
    //   transferCache?:
    //     | {
    //         includeHeaders?: string[];
    //       }
    //     | boolean;
}

export interface Transactions {
    items: Transaction[];

}

export interface Transaction {
    id?: number;
    Phone: string;
    TransactionAmount: number;
    ServiceId: number;
    RechargePlanId: number;
    PaymentMethodId: number;
    UserId?: number;
    IsSucceeded?:boolean;
}


export interface Operators {
    items: Operator[];
}

export interface Operator {
    id?: number;
    name: string;
}


export interface Recharge_plans {
    items: Recharge_plans[]
}
export interface Recharge_plan {
    id?: number;
    rechargePlanTypeName?: string;
    operatorName?: string;
    name: string;
    talkTime: number;
    textMessageNumber?: number;
    dataNumberTotal?: number;
    dataNumberPerDay?: number;
    validity: number;
    price: number;
    description: string;
}


export interface Feedbacks {
    items: FeedBack[]
}




export interface UserServices {
    items: UserServices[];
}

export interface UserService {
    id?: number;
    userName: string;
    serviceName: string;
    status: boolean;
}

export interface UserPayments {
    items: UserPayment[];
}

export interface UserPayment {
    id?: number;
    cardNumber: number;
    paymentMethodName: string;
    userName: string
}

export interface Users {
    items: User[]
}
export interface User {
    id?: number;
    name: string;
    phone: string;
    email: string;
    dob: Date;
    address: string;
}
export interface PaymentMethod{
    id?:number;
    name:string;
    description?:string;
}
export interface Servicees{
    id?:number;
    name:string;
    description?: string;
}
export interface FeedBack{
    id?:number;
    ServiceId?:number;
    Phone?:string;
    Content?:string
}









