
export interface IPermit{
    _id?: string
    user_id: string
    create_user_id?: string
    username: string
    email: string
    app_id?: string
    scope: Array<string>
}

export interface IApp{
    _id?: string
    name: string
    idc_id?: string
    user_id?: string
    domain: string
    sub_domain: string
    load_balance_id: string
    lb_template_id: string
    
    idc_name?: string
    app_zones?: Array<IAppZone>
    lbConfigs?: Array<ILBConfig>
}


// export interface _IApp{
//     _id?: string
//     name: string
//     idc_id: string
//     user_id: string
//     domain: string
//     sub_domain: string
//     load_balance_id: string
//     lb_template_id: string

//     idc_name?: string
//     app_zones: Array<IAppZone>
//     lb_configs?: Array<ILBConfig>
// }


// export interface _ILoadBalance{
//     _id?: string
//     name: string
//     idc_id?: string
//     user_id?: string
//     domain: string
//     sub_domain: string
//     load_balance_id: string

//     idc_name?: string
//     app_zones: Array<IAppZone>
//     lb_configs?: Array<ILBConfig>
//     public: boolean
// }

export interface ILoadBalance{
    _id?: string
    name: string
    idc_id?: string
    user_id?: string
    domain: string
    sub_domain: string
    load_balance_id: string

    idc_name?: string
    app_zones?: Array<IAppZone>
    lbConfigs?: Array<ILBConfig>
    public: boolean
}

export interface IProject{
    _id?: string
    name: string
    idc_id: string
    user_id: string
    domain: string
    load_balance: string
}


export interface ILBConfig{
    ip: string
    port: string
}

export interface IAppZone{
    _id?: string
    zone_id: string
    zone_name?: string
    app_id?: string
    env: string
    registry: string
    instance: number
    port_type: string
    cores: number
    memory: number
    port: number
    error?: string
    containers?: Array<IContainer>
}

export interface IRegion{
    _id?: string
    name: string
    matadata: Array<string>
}

export interface IIdc{
    _id?: string
    name: string 
    region_id: string
    region_name?: string 
    matadata: Array<string>
    config_endpoint: string
}

interface IPrice{
    name: string
    memory: string
    cores: string
}

export interface IZone{
    _id?: string
    name: string
    idc_id: string
    idc_name?: string
    engine_endpoint: string
    log_endpoint: string
    monitor_endpoint: string
    status_endpoint: string 
    max_instances: string
    matadata: Array<string>
}

export interface IContainer {
    container_id: string,
    container_name: string,
    HostIP: string,
    port: string
}

export interface ILbTemplate {
    _id?: string,
    name: string,
    template: string,
    user_id: string,
    type: string
}

export interface IUser{
    _id: string
    username: string
    email: string
    password: string
    money: string
    role?: Array<string>
}
