import { Link } from 'react-router-dom'
import type { ThreadData } from '../types/types';

const ThreadItem = ({ thread }: { thread: ThreadData }) => {
  return (
    <tr key={thread.id}>
      <td>
        <Link to={`/threads/${thread.id}`}>
          <div className='thread-item'>
            {thread.title}
          </div>
        </Link>
      </td>
    </tr>
  );
};

export default ThreadItem
