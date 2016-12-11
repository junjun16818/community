export interface ITopic{
    _id: string
    title: string
    tags: string[]
    markdown: string
    content: string
    html: string
    tag_str: string
    username: string
    user_id: string
    created: number
    modify: number
    avatar: string
    accept_comment_id? : string
    vote: number
    category_id: string
    favorite: number
    community_id: string
}
