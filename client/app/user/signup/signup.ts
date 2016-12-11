import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { UserService } from '../../../service/user.service'

declare var $

@Component({
    selector: 'user-singup',
    styleUrls: ['../signin/signin.css'],
    templateUrl: './signup.html',
})

export class UserSignupComponent implements OnInit
{
    private banner = `/images/blog-banner-user.png`
    private email = 'zzwqlr@hotmail.com'
    private username ='zzwqlr'
    private password = 'wenlai123'

    constructor(private router: Router, private _service: UserService)
    {
        
    }

    ngOnInit(){

    }

    ngAfterViewInit()
    {
        
    }

    private register()
    {
        this._service.register({ email: this.email, password: this.password, username: this.username }).then(user=>
        {
            $.niftyNoty({
                type: 'dark',
                container : 'floating',
                html : `Register successful. Is jump.`,
                timer : 3000
            })

            setTimeout(()=>{
                this.router.navigate(['/signin'])
            }, 100)

        }).catch(err=>
        {
            this.password = ''
            
            $.niftyNoty({
                type: 'danger',
                container : 'floating',
                html : `${err.message}`,
                timer : 3000
            })
        })
    }
}
