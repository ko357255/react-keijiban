import { Route, Routes } from 'react-router-dom';
import NewThreads from './pages/NewThreads';
import Home from './pages/Home';
import Threads from './pages/Threads';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {

  return (
    <div className='App'>
      <Header />

      {/*
       クライアントサイドルーティング
       サーバーにリクエストせず、JavaScriptでルートを切り替える仕組み
       URLごとに表示するコンポーネントを切り替える
      */}
      <Routes>
        {/* '/' ならHomeコンポーネントを表示する */}
        <Route path='/' element={<Home />} />
        {/* '/threads/new' ならNewThreadsを表示する */}
        <Route path='/threads/new' element={<NewThreads />} />
        {/* ':〇〇'で動的にパスを受け取る */}
        <Route path='/threads/:id' element={<Threads />} />

        {/* どのパスにもマッチしない場合、NotFoundを表示する */}
        <Route path='*' element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
