import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { UserService } from '../../service/user.service'
declare var $,Morris

@Component({
    selector: 'analytics',
    styleUrls: ['./analytics.css', '../include/background/background.css'],
    templateUrl: './analytics.html'
})

export class AnalyticsComponent implements OnInit
{
    private banner = `/images/blog-banner-user.png`
    private users = []
    ngOnInit(){
        this.userService.fans().then(users=>{
            this.users = users
        })
        // this.topicService.list(()=>{

        // })
    }
    
    
    constructor(private userService: UserService)
    {
        
    }
    ngAfterViewInit()
    {
        const data = [
        ]

        for( var i =0;i<30;i++){
            var date = `2016-11-${i < 10?0:''}${i+1}T00:00:00.000Z`
            console.log(date)
            data.push({ uv: parseInt(Math.random()*100 +''), pv: parseInt(Math.random()*1000 + ''), date: new Date(date) })
        }

        const chart = Morris.Line(
        {
            element: 'morris-chart-pageviews',
            data: data,
            // axes: false,
            ykeys: ['pv', 'uv'],
            labels: ['PV', 'UV'],
            xkey: 'date',
            xLabelFormat: (date)=>{
                console.log(date.label )
                return this.format(date.label, 'yyyy-MM-dd')
            },
            gridTextColor:'#999',
            gridEnabled: false,
            gridLineColor: 'transparent',
            lineColors: ['#7db8d8','#3b7093'],
            lineWidth: 1,
            pointSize: 2,
            parseTime: false,
            resize:true,
            hideHover: 'auto'
        })
    }

    format(date, fmt) 
    {
        if(!date.getMonth)
            date = new Date(date)
            
        var o = {
            "M+": date.getMonth() + 1, //月份 
            "d+": date.getDate(), //日 
            "h+": date.getHours(), //小时 
            "m+": date.getMinutes(), //分 
            "s+": date.getSeconds(), //秒 
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
            "S": date.getMilliseconds() //毫秒 
        };
        // console.log(o)
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        console.log(fmt)
        return fmt;
    }
}
