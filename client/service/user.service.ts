import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'
import { ITopic } from '../../interface/topic'
import { IUser } from '../../interface/user'
import { IFollow } from '../../interface/follow'

@Injectable()

export class UserService extends BasicService<IUser> 
{
    public user: IUser = <any>{}
    constructor(public http: Http) { 
        super() 
        this.setUser()
    }
    public base_url = '/api/user'
    
    public setUser(){
        this.getUser().then(user=>{
            console.log(user)
            this.user = user
        })
    }
    public getUser(): Promise<IUser>{
        return this._get('/api/user')
    }

    public login(data):Promise<IUser>{
        return this._post('/api/user/login', data)
    }

    public register(data): Promise<IUser>{
        return this._post('/api/user/register', data)
    }

    public logout(){
        return this._get('/api/user/logout')
    }

// _id: string
//     title: string
//     tags: string[]
//     markdown: string
//     content: string
//     html: string
//     tag_str: string
//     username: string
//     user_id: string
//     created: number
//     avatar: string
//     type: string
//     pv: number
    public questions(): Promise<ITopic[]>
    {
        const datas:any = []

        for( let i = 0; i < 10; i++ ){
            datas.push({
                title: `教程: Angular2 Http注册登录验证(${i+1})`,
                content: 'content',
                pv: 10,
                favorites: 10,
                comments: 10,
                created: new Date()
            })
        }

        return new Promise((resolve, reject)=>{
            resolve(datas)
        })
    }

    public notes(): Promise<ITopic[]>
    {
        const datas:any = []

        for( let i = 0; i < 10; i++ )
        {
            datas.push({
                title: `angular2 更改http请输头部信息(${i+1})`,
                content: 'content',
                pv: 10,
                favorites: 10,
                comments: 10,
                created: new Date()
            })
        }

        
        return new Promise((resolve, reject)=>{
            resolve(datas)
        })
    }

    public answers(): Promise<ITopic[]>
    {
        const datas:any = []

        for( let i = 0; i < 10; i++ )
        {
            datas.push({
                title: `ANGULAR2 如何实现页面刷新(${i+1})`,
                content: 'content',
                stars: 10,
                pv: 10,
                comments: 10,
                created: new Date()
            })
        }

        
        return new Promise((resolve, reject)=>{
            resolve(datas)
        })
    }

    public favorites(): Promise<ITopic[]>
    {
        const datas:any = []

        for( let i = 0; i < 10; i++ )
        {
            datas.push({
                title: `教程: Angular2 依赖注入(${i+1})`,
                content: 'content',
                pv: 10,
                favorites: 10,
                comments: 10,
                created: new Date()
            })
        }

        
        return new Promise((resolve, reject)=>{
            resolve(datas)
        })
    }

    public follow(): Promise<IFollow[]> 
    {
        const datas:any = []

        for( let i = 0; i < 10; i++ )
        {
            datas.push({
                username: `wenlai(${i+1})`,
                avatar: 'images/av3.png',
                introduction: '北京光音网络web前端',
                date: new Date()
            })
        }

        return new Promise((resolve, reject)=>{
            resolve(datas)
        })
    }

    public fans(): Promise<IFollow[]> 
    {
        const datas:any = []

        for( let i = 0; i < 10; i++ )
        {
            datas.push({
                username: `junjun16818(${i+1})`,
                avatar: 'images/av2.png',
                introduction: '阿里巴巴前端架构师',
                date: new Date()
            })
        }

        return new Promise((resolve, reject)=>{
            resolve(datas)
        })
    }


}
