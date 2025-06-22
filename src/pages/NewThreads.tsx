
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NewThreads() {
  const [title, setTitle] = useState('');

  // 遷移関数の定義
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

  // 入力の変化を受け取り、代入する
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  return (
    <main>
      <div>
        <div className='threads-title-box'>
          <h2 className='title'>
            スレッドを立てる
          </h2>
          <Link to={'/'} className='link-box'>
            <div>
              一覧に戻る
            </div>
          </Link>
        </div>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input name='title' type="text" value={title} placeholder='スレッド名' onChange={handleChange} className='input-new-threads' />
          <input type="submit" value='立てる' className='btn-new-threads' />
        </form>
      </div>
    </main>
  )
}

export default NewThreads;