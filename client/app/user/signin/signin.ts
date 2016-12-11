import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { UserService } from '../../../service/user.service'
declare var $

@Component({
    selector: 'user-signin',
    styleUrls: ['./signin.css'],
    templateUrl: './signin.html',
    
})

export class UserSigninComponent implements OnInit
{
    private banner = `/images/blog-banner-user.png`
    private username = 'zzwqlr'
    private password = 'wenlai123'
    constructor(private router: Router, private _service: UserService)
    {
        
    }

    ngOnInit(){

    }

    ngAfterViewInit()
    {
         
    }

    private login()
    {
        this._service.login({ username: this.username, password: this.password }).then(user=>
        {
            $.niftyNoty({
                type: 'dark',
                container : 'floating',
                html : `登录成功`,
                timer : 3000
            })
            this._service.setUser()
            setTimeout(()=>{
                this.router.navigate(['/user']) 
            }, 100)

        }).catch(err=>
        {
            console.log(err)
            $.niftyNoty({
                type: 'danger',
                container : 'floating',
                html : `登录失败`,
                timer : 3000
            })
        })
    }
}
