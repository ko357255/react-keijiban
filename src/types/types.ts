
export interface ThreadData {
  id: string,
  title: string,
}
export interface PostData {
  id: string,
  post: string,
}

export interface PostGetResponse {
  threadId: string,
  posts: PostData[],
}