import './MusicCard.css'

export default function MusicCard({ title, description, cover }) {

  return (
    <div className='each-music'>
      <img src={cover} alt='capa da música' />
      <p className='title'>{title}</p>
      <p className='description'>{description}</p>
    </div>
  );
}