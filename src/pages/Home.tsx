import { useEffect, useState } from 'react';
import type { ThreadData } from '../types/types';
import ThreadItem from '../components/ThreadItem';
import ThreadTitle from '../components/ThreadTitle';

const Home = () => {
  // スレッド
  const [threads, setThreads] = useState<ThreadData[]>([]);
  // エラー null=エラーなし 文字列=エラーあり
  const [error, setError] = useState<string | null>(null);
  // ロード中かどうか
  const [loading, setLoading] = useState<boolean>(true);


  // スレッド一覧の取得処理
  const fetchThreads = async () => {
    // ↑ constで定義すると再代入防止、巻き上げなし（定義前に呼ぶとエラー）

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
    } catch (error) { // エラーの処理
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Error: Unknown');
      }

    } finally { // try-catchで最後に実行される
      setLoading(false); // ロード中を終わる
    }
  }

  useEffect(() => {
    fetchThreads();
  }, []); // 初回描写時に実行

  return (
    <main>
      <div>
        <ThreadTitle title='スレッド一覧' toTitle='スレッドを立てる' to='/threads/new' />
        <table className='threads-table'>
          <tbody>
            {loading ? ( // ローディング中なら
              <tr>
                <td>
                  Loading...
                </td>
              </tr>
            ) : error ? ( // エラーがあるなら
              <tr>
                <td className='error'>
                  {error}
                </td>
              </tr>
            ) : threads.length == 0 ? ( // スレッドが0なら
              <tr>
                <td>
                  スレッドはありません
                </td>
              </tr>
            ) : ( // ではないなら
              // threds配列を回して、アイテムを作る
              threads.map((thread) => (
                <ThreadItem thread={thread} key={thread.id} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Home
