import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OperatorsComponent } from './operators/Operators/operators.component';
import { FeedbacksComponent } from './feedbacks/feedbacks.component';
import { PaymentMethodsComponent } from './payment-methods/Payment-method/payment-methods.component';
import { ServicesComponent } from './service-type/ServiceType/services.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { AddRechargePlanComponent } from './recharge-plans/add-recharge-plan/add-recharge-plan.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/User/users.component';
import { DetailUserComponent } from './users/detail-user/detail-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { CreateOperatorComponent } from './operators/create-operator/create-operator.component';
import { EditOperatorComponent } from './operators/edit-operator/edit-operator.component';
import { CreatePaymentMethodComponent } from './payment-methods/create-payment-method/create-payment-method.component';
import { EditPaymentMethodComponent } from './payment-methods/edit-payment-method/edit-payment-method.component';
import { CreateServiceTypeComponent } from './service-type/create-service-type/create-service-type.component';
import { EditServiceTypeComponent } from './service-type/edit-service-type/edit-service-type.component';
import { RechargePlansComponent } from './recharge-plans/RechargePlan/recharge-plans.component';
import { CreateRechargePlanTypeComponent } from './recharge-plans/create-recharge-plan-type/create-recharge-plan-type.component';
import { EditRechargePlanComponent } from './recharge-plans/edit-recharge-plan/edit-recharge-plan.component';
import { DeleteOperatorComponent } from './operators/delete-operator/delete-operator.component';
import { DeletePaymentMethodComponent } from './payment-methods/delete-payment-method/delete-payment-method.component';
import { DeleteRechargePlanComponent } from './recharge-plans/delete-recharge-plan/delete-recharge-plan.component';
import { DeleteServiceTypeComponent } from './service-type/delete-service-type/delete-service-type.component';

export const routes: Routes = [
    {
        path: '', component : DashboardComponent
    },
    {
        path: 'operators', component : OperatorsComponent
    },
    {
        path: 'payment-methods', component : PaymentMethodsComponent
    },
    {
        path: 'recharge-plans', component : RechargePlansComponent
    },
    {
        path: 'services', component : ServicesComponent
    },
    {
        path: 'feedbacks', component : FeedbacksComponent
    },
    {
        path: 'users', component : UsersComponent
    },
    {
        path: 'add-user', component : CreateUserComponent
    },
    {
        path: 'detail-user', component : DetailUserComponent
    },
    {
        path: 'add-recharge-plan', component : AddRechargePlanComponent
    },
    {
        path: 'login', component : LoginComponent
    },
    {
        path: 'users/:id/edit', component : EditUserComponent
    },
    {
        path: 'users/:id/delete', component : DeleteUserComponent
    },
    {
        path: 'create-operator', component: CreateOperatorComponent
    },
    {
        path: 'operators/:id/edit', component : EditOperatorComponent
    },
    {
        path: 'operators/:id/delete', component : DeleteOperatorComponent
    },
    {
        path: 'create-paymentMethod', component: CreatePaymentMethodComponent
    },
    {
        path: 'payment-methods/:id/edit', component : EditPaymentMethodComponent
    },
    {
        path: 'payment-methods/:id/delete', component : DeletePaymentMethodComponent
    },
    {
        path: 'create-service-type', component: CreateServiceTypeComponent
    },
    {
        path: 'services/:id/edit', component : EditServiceTypeComponent
    },
    {
        path: 'services/:id/delete', component : DeleteServiceTypeComponent
    },
    {
        path: 'users/:id/detail', component : DetailUserComponent
    },
    {
        path: 'create-recharge-plan-type', component : CreateRechargePlanTypeComponent
    },
    {
        path: 'recharge-plans/:id/edit', component : EditRechargePlanComponent
    },
    {
        path: 'recharge-plans/:id/delete', component : DeleteRechargePlanComponent
    }
];
