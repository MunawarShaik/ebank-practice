import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    userId: '',
    pin: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 40})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  renderPasswordField = () => {
    const {pin} = this.state
    return (
      <>
        <label className="input-label" htmlFor="pin">
          PIN
        </label>
        <input
          type="password"
          id="pin"
          placeholder="Enter PIN"
          className="input-field"
          value={pin}
          onChange={this.onChangePin}
        />
      </>
    )
  }

  renderUsernameField = () => {
    const {userId} = this.state
    return (
      <>
        <label className="input-label" htmlFor="userId">
          User ID
        </label>
        <input
          type="text"
          id="userId"
          placeholder="Enter User ID"
          className="input-field"
          value={userId}
          onChange={this.onChangeUserId}
        />
      </>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="app-container">
        <div className="login-form-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="login-image"
            alt="website login"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <h1>Welcome Back</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
