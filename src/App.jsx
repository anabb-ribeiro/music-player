import { useState } from 'react'
import Logo from './assets/logo.svg'
import Perfil from './assets/profile.jpg'
import MusicCard from './components/MusicCard/MusicCard'
import Player from './components/Player/Player'
import Musics from './musics'
import './App.css'

function App() {
  const [musicInfo, setMusicInfo] = useState({});

  return (
    <div className="root">
      <header>
        <img src={Logo} alt="Logo" className='logo' />
        <div className='user-welcome'>
          <img src={Perfil} alt="foto do usuário" className='profile-pic' />
          <p>Bem vinda, Ana.</p>
        </div>
      </header>
      <main>
        <h1>The best playlist</h1>
        <div className="music-card">
          {Musics.map((music) =>
            <div key={music.id} onClick={() => setMusicInfo(music)}>
              <MusicCard
                title={music.title}
                artist={music.artist}
                description={music.description}
                cover={music.cover}
              />
            </div>
          )}
        </div>
      </main>
      <footer>
        <Player musicInfo={musicInfo} setMusicInfo={setMusicInfo} />
      </footer>
    </div>
  );
}

export default App
