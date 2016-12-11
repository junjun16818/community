import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { NavComponent } from './nav/nav'
import { TagsComponent } from './tags/tags'
import { BackgroundComponent } from './background/background'
import { FooterComponent } from './footer/footer'

var components = [
    NavComponent,
    TagsComponent,
    BackgroundComponent,
    FooterComponent
]

@NgModule({
    declarations: components,
    exports: components,
    imports: [ FormsModule, BrowserModule, RouterModule ],
    providers: [ ],
})

export class IncludeModule {

}
