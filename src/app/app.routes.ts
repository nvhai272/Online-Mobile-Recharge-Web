import { Routes } from '@angular/router';
import { HomeComponent } from './Home/home/home.component';
import { FeedbackComponent } from './Component/feedback/feedback.component';
import { SupportComponent } from './Component/support/support.component';
import { SingleComponent } from './Component/single/single.component';
import { DetailPageComponent } from './Component/detail-page/detail-page.component';
import { LoginComponent } from './Component/Logiinn/login.component';

export const routes: Routes = [

    { path: '', component: HomeComponent },
    {path:'feedback',component:FeedbackComponent},
    {path:'support',component:SupportComponent},
    {path:'list',component:SingleComponent},
    {path:'detail/:id',component:DetailPageComponent},
    {path:'login',component:LoginComponent},
    
];
