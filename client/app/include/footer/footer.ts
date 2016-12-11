import {Component, Input} from '@angular/core';

declare var $

@Component({
    selector: 'main-footer',
    styleUrls: ['./footer.css'],
    templateUrl: './footer.html'
})

export class FooterComponent  
{
    @Input() banner: string
    @Input() title: string
    ngAfterViewInit()
    {
        
    }
}
