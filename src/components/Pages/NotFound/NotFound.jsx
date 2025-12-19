import { Link } from 'react-router'
import './NotFound.css'

const NotFound = () => {
  return (
    <div className='body'>
      <h1>Oops! Page not found.</h1>
      <Link to="/">Back to home</Link>
    </div>
  )
}

export default NotFound