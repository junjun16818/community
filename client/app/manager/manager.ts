import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { UserService } from '../../service/user.service'
declare var $,Morris

@Component({
    selector: 'manager',
    styleUrls: ['./manager.css', '../include/background/background.css'],
    templateUrl: './manager.html'
})

export class ManagerComponent implements OnInit
{
    private banner = `/images/blog-banner-user.png`
    private users = []
    ngOnInit(){
        
    }
    
    
    constructor(private userService: UserService)
    {
        
    }
    ngAfterViewInit()
    {
        
    }

}
