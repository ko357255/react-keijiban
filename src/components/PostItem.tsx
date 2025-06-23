import type { PostData } from '../types/types';

const PostItem = ({ post }: { post: PostData }) => {
  return (
    <tr>
      <td>
        <div className='post-item'>
          <div className='post-message'>
            {post.post}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default PostItem;
