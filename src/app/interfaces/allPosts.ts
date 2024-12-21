export interface User {
    id:string , 
    name:string , 
    photo: string
}
export interface Comments {
    _id:string , 
    content:string,
    commentCreator:User,
    post: string,
    createdAt:string
}
export interface Post {
    _id:string,
    body:string,
    image:string,
    user:User,
    createdAt:string,
    comments:Comments[],
    id:string
}