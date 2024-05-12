import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { FeedbackComponent } from './Component/feedback/feedback.component';
import { SupportComponent } from './Component/support/support.component';
import { DetailPageComponent } from './Component/detail-page/detail-page.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { RechargePlanComponent } from './Component/recharge_plan/recharge_plan.component';
import { LoginComponent } from './Component/login/login.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    {path:'feedback',component:FeedbackComponent},
    {path:'support',component:SupportComponent},
    {path:'recharge-plans',component:RechargePlanComponent},
    {path:'detail/:id',component:DetailPageComponent},
    {path:'login',component:LoginComponent},
    {path:'profile/:id',component:ProfileComponent}

];
