var MongoClient = require('mongodb').MongoClient

export function connect(url)
{
    var db = null

    class MongoTransfer<T>
    {
        constructor(private exector){}

        toArray(): Promise<T[]>
        {
            return new Promise((resolve, reject) => 
            {
                this.exector((err, coll)=>
                {
                    coll.toArray((err, docs:T[])=>{
                        if( err )
                            return reject(err)
                        
                        resolve(docs)
                    })
                })
            })
        }

        sort(data): MongoTransfer<T>
        {
            return new MongoTransfer<T>((done)=>{
                this.exector((err, coll)=>{
                    done(err, coll.sort(data))
                })
            })
        }

        limit(data): MongoTransfer<T>
        {
            return new MongoTransfer<T>((done)=>{
                this.exector((err, coll)=>{
                    done(err, coll.limit(data))
                })
            })
        }

        skip(data): MongoTransfer<T>
        {
            return new MongoTransfer<T>((done)=>{
                this.exector((err, coll)=>{
                    done(err, coll.skip(data))
                })
            })
        }
    }

    class Mongodb<T>
    {
        private coll = null

        constructor(private dbname){
        }

        private getDB(done)
        {
            if( db )
                return done(null, db)

            MongoClient.connect(url).then(_db=>{
                if( !db )
                    db = _db

                done(null, db)
            }).catch(err=>{
                done(err)
            }) 
        }

        private getColl(done)
        {
            if( this.coll )
                return done(null, this.coll)

            this.getDB((err, db)=>
            {
                if( err )
                    return done(err)

                this.coll = db.collection(this.dbname)
                done(null, this.coll)
            })
        }

        find(...args): MongoTransfer<T>
        {
            
            return new MongoTransfer<T>((done)=>
            {
                this.getColl((err, coll)=>
                {
                    if( err )
                        return done(err)
                    
                    done(null, coll.find.apply(this.coll, args))
                })
            })
        }

        findOne(...args): Promise<T>{
            return this.execFn('findOne', args)
        }

        execFn(fn, args): Promise<T>
        {
            return new Promise((resolve, reject) => 
            {
                this.getColl((err, coll)=>
                {
                    if( err )
                        return reject(err)
                   
                    coll[fn].apply(this.coll, args.concat([(err, data)=>{
                        if( err ) 
                            return reject(err)
                        
                        resolve(data)
                    }]))
                })
            })
        }

        findOneAndUpdate(...args): Promise<T>{
            return this.execFn('findOneAndUpdate', args)
        }

        findOneAndDelete(...args): Promise<T>{
            return this.execFn('findOneAndUpdate', args)
        }

        insert(...args): Promise<any>{
            return this.execFn('insert', args)
        }

        insertOne(...args): Promise<T>{
            return this.execFn('insertOne', args)
        }

        insertMany(...args): Promise<T>{
            return this.execFn('insertMany', args)
        }

        update(...args): Promise<T>{
            return this.execFn('update', args)
        }

        updateOne(...args): Promise<T>{
            return this.execFn('updateOne', args)
        }

        updateMany(...args): Promise<T>{
            return this.execFn('updateMany', args)
        }

        delete(...args): Promise<T>{
            return this.execFn('delete', args)
        }

        deleteOne(...args): Promise<T>{
            return this.execFn('deleteOne', args)
        }

        deleteMany(...args): Promise<T>{
            return this.execFn('deleteMany', args)
        }

        createIndex(...args){
            return this.execFn('createIndex', args)
        }
    }

    return { 
        collection<T>(name){
            return new Mongodb<T>(name)
        }
    }
}

declare function require(name:string)
