import { Link, type To } from 'react-router-dom';

const ThreadTitle = ({title, toTitle, to}: {title: string, toTitle: string, to: To}) => {
  return (
    <div className='threads-title-box'>
      <h2 className='title'>{title}</h2>
      <Link to={to} className='link-box'>
        <div>
          {toTitle}
        </div>
      </Link>
    </div>
  )
}

export default ThreadTitle