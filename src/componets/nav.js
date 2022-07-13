import { Link } from 'react-router-dom'

const Nav = () => {

  return (
    <>
      <nav className="nav">
        <div className="container">

          <div className="logo">
            <Link to='/'><h1>HAM 44</h1></Link>
          </div>

          <div className="links">
            <Link to='/stats'>Stats</Link>
            <Link to='/results'>Results</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav