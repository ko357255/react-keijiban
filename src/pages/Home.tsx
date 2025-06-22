import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Thread = {
  id: string,
  title: string,
}

const Home = () => {

  const [threads, setThreads] = useState<Thread[]>([]);

  // スレッド一覧の取得処理
  const fetchThreads = async () => {
    // ↑ constで定義したほうが良いらしい 
    //   再代入防止、巻き上げなし（定義前に呼ぶとエラー）

    const offset = 0;
    const url = `https://railway.bulletinboard.techtrain.dev/threads?offset=${offset}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(res.status, res.statusText);
        return
      }
      const data: Thread[] = await res.json();
      setThreads(data);
    } catch (e) {
      console.error(e);
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
              <tr key={thread.id}>
                <td>
                  <Link to={`/threads/${thread.id}`}>
                    <div className='thred-item'>
                      {thread.title}
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}

export default Home
