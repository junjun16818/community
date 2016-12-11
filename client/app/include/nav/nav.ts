import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../service/user.service'

declare var $

@Component({
    selector: 'app-nav',
    styleUrls: ['./nav.css'],
    templateUrl: './nav.html'
})

export class NavComponent implements OnInit
{
    private user = this.userService.user
    constructor(private userService: UserService, private router: Router){

    }

    ngOnInit(){

        // this.user = this.userService.user
    }

    logout()
    {
        this.userService.logout().then(()=>{
            $.niftyNoty({
                type: 'dark',
                container : 'floating',
                html : `注销成功`,
                timer : 3000
            })
            this.userService.user = undefined

            setTimeout(()=>{
                this.router.navigate(['/signin']) 
            }, 100)
        }).catch(err=>
        {
            $.niftyNoty({
                type: 'danger',
                container : 'floating',
                html : `注销失败`,
                timer : 3000
            })
        })
    }

    ngAfterViewInit()
    {
        
    }
}
