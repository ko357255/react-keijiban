
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

type Post = {
  id: string,
  post: string,
}

type PostGetResponse = {
  threadId: string,
  posts: Post[],
}

function Threads() {
  const [title, setTitle] = useState('スレッド名');
  const [posts, setPosts] = useState<Post[]>([]);

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

  useEffect(() => {
    fetchPosts();
  }, []); // 初回描写時に実行


  return (
    <main>
      <div>
        <div className='threads-title-box'>
          <h2 className='title'>{title}</h2>
          <Link to={'/'} className='link-box'>
            <div>
              スレッド一覧に戻る
            </div>
          </Link>
        </div>
      </div>
      <div>
        <table className='posts-table'>
          <tbody>
            {posts.map((post, i) => (
              <tr key={post.id}>
                <td>
                  <div className='post-item'>
                    <div className='post-num'>
                      {i + 1}
                    </div>
                    <div className='post-message'>
                      {post.post}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Threads;