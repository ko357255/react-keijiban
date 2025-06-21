
import { Link } from 'react-router-dom';

function NewThreads() {
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
        <form action="post">
          <input type="text" />
          <input type="submit" value='決定'/>
        </form>
      </div>
    </main>
  )
}

export default NewThreads;