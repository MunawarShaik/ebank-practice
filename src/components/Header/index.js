import {withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="logo"
          alt="website logo"
        />
        <button type="button" className="button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
