import {Component, Input} from '@angular/core';

declare var $

@Component({
    selector: 'background',
    styleUrls: ['./background.css'],
    template: `
        <div class="hero background-sky header-block" style="">
            <div class="container" style="" [ngStyle]="{'background-image': 'url(' + banner + ')', 'height':'250px'}">
                <div class="title" style="float:left" >{{title}}</div>
            </div>
        </div>
    `
})

export class BackgroundComponent  
{
    @Input() banner: string
    @Input() title: string
    ngAfterViewInit()
    {
        
    }
}
