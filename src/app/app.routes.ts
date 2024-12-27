import { Routes } from '@angular/router';
import { ChatComponent } from './shared/components/chat/chat.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
    { path: 'sign-in', component: SigninComponent },
    { path: 'sign-up', component: SignupComponent },
    { path: 'home', component: ChatComponent },
    { path: 'group/:id', component: ChatComponent },
];
