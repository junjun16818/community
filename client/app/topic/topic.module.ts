import { NgModule, Component } from '@angular/core'
import { RouterModule, Routes, Route } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { TopicListComponent } from './list/list'
import { TopicFormComponent } from './form/form'
import { TopicComponent } from './detail/detail'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { IncludeModule } from '../include/include.module'
import { CommonModule } from '@angular/common'
import { CommentService } from '../../service/comment.service'
import { ReplyService } from '../../service/reply.service'

import { TopicService } from '../../service/topic.service'
import { TagService } from '../../service/tag.service'
import { CategoryService } from '../../service/category.service'
import { QoncreteService } from '../../service/qoncrete.service'

declare var $, jQuery

const appRoutes: Routes = [
    { path: 'news', component: TopicListComponent },
    { path: 'news/:sort', component: TopicListComponent },
    { path: 'question', component: TopicListComponent },
    { path: 'question/:sort', component: TopicListComponent },
    { path: 'note', component: TopicListComponent },
    { path: 'note/:sort', component: TopicListComponent },
    { path: 'topic/:_id', component: TopicComponent },
    { path: 'create/:type', component: TopicFormComponent }
]

@NgModule({
    declarations: [ TopicListComponent, TopicComponent, TopicFormComponent ],
    imports     : [ HttpModule, IncludeModule, CommonModule, RouterModule.forChild(appRoutes), FormsModule ],
    providers   : [ { provide: LocationStrategy, useClass: HashLocationStrategy }, TopicService, CommentService, ReplyService, TagService, CategoryService, QoncreteService ],
    exports: [  ],
})

export class TopicModule {
    
}
