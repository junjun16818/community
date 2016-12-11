


export interface IComment{
    _id: string
    user_id: string
    username: string
    avatar: string
    topic_id: string
    html: string
    markdown: string
    community_id: string
    replyList?: IReply[]
    vote: number,
    created: number
}

export interface IReply{
    _id: string
    user_id: string
    username: string
    avatar: string
    content: string
    comment_id: string
    to_username: string
    to_user_id: string
    topic_id: string
    community_id: string
    created: number
}

