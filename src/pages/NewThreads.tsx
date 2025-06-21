
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NewThreads() {
  const [title, setTitle] = useState('');

  const navigate = useNavigate();

  const createThreads = async () => {
    const url = `https://railway.bulletinboard.techtrain.dev/threads`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        console.error(res.status, res.statusText);
        return
      }
      const result: { id: string, title: string } = await res.json();

      alert(`「${result.title}」を立てました`);
      // トップページに遷移する
      navigate('/');

    } catch (e) {
      console.error(e);
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // フォームの送信をキャンセルする
    createThreads();
  }

  // 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <main>
      <div>
        <div className='threds-title-box'>
          <h2 className='title'>スレッドを立てる</h2>
          <Link to={'/'} className='link-box'>
            <div>
              戻る
            </div>
          </Link>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">スレッド名</label>
          <input name='title' type="text" value={title} placeholder='スレッド名' onChange={handleChange} />
          <input type="submit" value='決定' />
        </form>
      </div>
    </main>
  )
}

export default NewThreads;