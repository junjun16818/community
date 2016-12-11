import { NgModule, Component } from '@angular/core'
import { RouterModule, Routes, Route } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { IncludeModule } from '../include/include.module'
import { CommonModule } from '@angular/common'

import { UserSigninComponent } from './signin/signin'
import { UserForgotComponent } from './forgot/forgot'
import { UserSignupComponent } from './signup/signup'
import { UserCenterComponent } from './center/center'
import { TopicService } from '../../service/topic.service'
import { UserService } from '../../service/user.service'
import { DateFormat } from '../../pipes/dateFormat'

declare var $, jQuery

const appRoutes: Routes = [
    { path: 'signin', component: UserSigninComponent },
    { path: 'forgot', component: UserForgotComponent },
    { path: 'signup', component: UserSignupComponent },
    { path: 'user', component: UserCenterComponent },
]

@NgModule({
    declarations: [ UserSigninComponent, UserForgotComponent, UserSignupComponent, UserCenterComponent, DateFormat ],
    imports     : [ HttpModule, IncludeModule, CommonModule, RouterModule.forChild(appRoutes), FormsModule ],
    providers   : [ { provide: LocationStrategy, useClass: HashLocationStrategy }, TopicService, UserService ],
    exports: [  ],
})

export class UserModule {
    
}
