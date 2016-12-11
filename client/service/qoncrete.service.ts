import { Injectable } from '@angular/core'
import { Http } from '@angular/http'
import { BasicService } from './basic/basic.service'

@Injectable()

export class QoncreteService extends BasicService<any> 
{
    constructor(public http: Http) { super() }
    public base_url = '/api/reply'

    public listByComment(comment_id: string){
        return this._get(`${this.base_url}/${comment_id}`)
    }
    
    public getTopicPageView(topic_id):Promise<number>
    {
        var search = window['Base64'].encode(`["${topic_id}"]`)
        var mainReport = {
            at: '0000-01-01T00:00:00.000Z',
            cursor: 0,
            from: '0000-01-01T00:00:00.000Z',
            klen: 2,
            limit: 20,
            order: 'desc',
            rid: 'd843dff0-0ae8-4029-818e-34d27d13ffb7',
            search: search,
            sid: '54746e54-4de2-4a52-b736-668ceafe7196',
            sort: -1,
            to: 'now'
        }

        return new Promise((resolv, reject)=>{
            this.mergereports(mainReport).then(report=>{
                resolv(report.data[0][0].values[0])
            }).catch(err=>{
                reject(err)
            })
        })
    }

    public _mergereports(mainReport, subReports)
    {
        
        return this.http.post(`https://api.qoncrete.com/v2/query/mergereports`, JSON.stringify({ mainReport: mainReport, subReports: subReports }) ,this.getOps())
            .toPromise()
            .then(response => response.json() as any)
            .catch(this.handleError)
    }

    public mergereports(mainReport): Promise<any>
    {
        
        return new Promise((resolve, reject)=>
        {
            this._mergereports(mainReport, []).then(data=>{
                resolve(data)
            }).catch(err=>{
                reject(err)
            })
        })
    }

    private _transData(scandates, num, report)
    {
        // scandates.forEach(datas=>
        // {
        //     datas.forEach(data=>
        //     {
        //         // var scandate = datas[0]
        //         const keys = data.key.split('!')

        //         if( parseInt(keys[0]) === 0 ){
        //             data.date = keys[1]
        //             data._data = this.getDataFormat(report.period, keys[1])
        //         }
        //         else {
        //             data.date = keys[1]
        //             if(keys.length && keys[0]){
        //                 data._data = JSON.parse(window['Base64'].decode(keys[parseInt(keys[0])+1])).join(' - ') || '(empty)'
        //             }
        //         }
        //         data.isNext = true

        //         if( report.groupBy.length > parseInt(keys[0]))
        //             data.isNext = true
        //         else
        //             data.isNext = false
        //     })
        // })
    }

}


