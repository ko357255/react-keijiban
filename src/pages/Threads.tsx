
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { PostData, PostGetResponse } from '../types/types';
import PostItem from '../components/PostItem';
import ThreadTitle from '../components/ThreadTitle';


const Threads = () => {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [postMessage, setPostMessage] = useState<string>('');
  const title = 'スレッド名';

  // URLの:idを受け取る
  const { id } = useParams();

  const fetchPosts = async () => {
    const offset = 0;
    const url = `https://railway.bulletinboard.techtrain.dev//threads/${id}/posts?offset=${offset}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(res.status, res.statusText);
        return
      }
      const data: PostGetResponse = await res.json();
      setPosts(data.posts);
      console.log(data.posts)
    } catch (e) {
      console.error(e);
    }
  }

  const createPost = async () => {
    const url = `https://railway.bulletinboard.techtrain.dev/threads/${id}/posts`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ post: postMessage }),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!res.ok) {
        console.error(res.status, res.statusText);
        return
      }
      setPostMessage('');
      fetchPosts();
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []); // 初回描写時に実行

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostMessage(e.target.value);
    console.log(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (postMessage.trim() == '') {
      alert('コメントを入力してください');
      return;
    }
    createPost();
  }

  return (
    <main>
      <ThreadTitle title={title} toTitle='一覧に戻る' to={'/'}/>
      <form onSubmit={handleSubmit} className='post-form'>
        <textarea
          name="post" id="post" placeholder='コメント'
          rows={5} cols={40}
          value={postMessage} onChange={handleChange} />
        <input type="submit" value='投稿' />
      </form>
      <table className='posts-table'>
        <tbody>
          {posts.map((post) => (
            <PostItem post={post} key={post.id}/>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default Threads;