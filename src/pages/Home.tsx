import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';
import type { ThreadData } from '../types/types';

const Home = () => {
  const [threads, setThreads] = useState<ThreadData[]>([]);

  // スレッド一覧の取得処理
  const fetchThreads = async () => {
    // ↑ constで定義したほうが良いらしい 
    //   再代入防止、巻き上げなし（定義前に呼ぶとエラー）

    const offset = 0;
    const url = `https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`;
    try {
      const res = await fetch(url);
      if (!res.ok) { // APIのエラー 404とか500とか
        // エラーを発生させる
        // error.message に格納される
        throw new Error(`Error: ${res.statusText}`);
      }
      const data: ThreadData[] = await res.json();
      setThreads(data);
    } catch (error: any) { // エラーの処理
      console.error(error);
      
    } finally {
      // try-catchで最後に実行される

    }
  }

  useEffect(() => {
    fetchThreads();
  }, []); // 初回描写時に実行


  return (
    <main>
      <div>
        <div className='threads-title-box'>
          <h2 className='title'>スレッド一覧</h2>
          <Link to={'/threads/new'} className='link-box'>
            <div>
              スレッドを立てる
            </div>
          </Link>
        </div>
        <table className='threads-table'>
          <tbody>
            {/* thread配列を繰り返し、テーブル化する */}
            {threads.map((thread) => (
              <ThreadItem thread={thread} key={thread.id} />
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Home
