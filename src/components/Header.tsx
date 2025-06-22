import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to={'/'}>
        <h1 className='app-title'>掲示板アプリ</h1>
      </Link>
    </header>
  )
}

export default Header;