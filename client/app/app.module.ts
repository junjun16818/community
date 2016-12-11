import { NgModule, Component } from '@angular/core'
import { RouterModule, Routes, Route } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { TopicModule } from './topic/topic.module'
import { UserModule } from './user/user.module'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { IncludeModule } from './include/include.module'
import { CommonModule } from '@angular/common'

import { TopicListComponent } from './topic/list/list'
import { TopicFormComponent } from './topic/form/form'
import { TopicComponent } from './topic/detail/detail'
import { AnalyticsComponent } from './analytics/analytics'
import { ManagerComponent } from './manager/manager'

//services

import { TopicService } from '../service/topic.service'

declare var $, jQuery

@Component({
    selector: 'app', 
    template: `
        <div id="container" class="effect mainnav-lg">
            <app-nav></app-nav> 
            <div class="boxed">
                <div id="content-container">
                    <router-outlet></router-outlet> 
                </div>
            </div>
            <main-footer></main-footer>
        </div>
    `
})

export class AppComponent 
{
    ngAfterViewInit(){

    }
}

const appRoutes: Routes = [
    { path: '', redirectTo: 'news', pathMatch: 'full' },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'manager', component: ManagerComponent }
]

@NgModule({
    declarations: [ AppComponent, AnalyticsComponent, ManagerComponent ],
    imports     : [ HttpModule, IncludeModule, CommonModule, RouterModule.forRoot(appRoutes), FormsModule, TopicModule, UserModule ],
    providers   : [ { provide: LocationStrategy, useClass: HashLocationStrategy }, TopicService ],
    exports: [  ],
    bootstrap   : [ AppComponent ]
})

export class AppModule {
    
}
