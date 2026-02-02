import React, { Component } from 'react';
import AuthContext from '../context/auth-context';
import './AuthPage.css';

class AuthPage extends Component {
  state = {
    isLogin: true,
    error: null,
    loading: false,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => ({ isLogin: !prevState.isLogin, error: null }));
  };

  submitHandler = async event => {
    event.preventDefault();
    this.setState({ loading: true, error: null });

    const email = this.emailEl.current.value.trim();
    const password = this.passwordEl.current.value.trim();

    if (!email || !password) {
      this.setState({ error: 'Email and password cannot be empty.', loading: false });
      return;
    }

    let requestBody;
    if (this.state.isLogin) {
      requestBody = {
        query: `
          query Login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              userId
              token
              tokenExpiration
            }
          }
        `,
        variables: { email, password }
      };
    } else {
      requestBody = {
        query: `
          mutation CreateUser($userInput: UserInput!) {
            createUser(userInput: $userInput) {
              id
              email
            }
          }
        `,
        variables: { userInput: { email, password } }
      };
    }

    try {
      const res = await fetch('http://localhost:8000/graphql', {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' },
      });

      const resData = await res.json();

      if (resData.errors && resData.errors.length > 0) {
        this.setState({ error: resData.errors[0].message, loading: false });
        return;
      }

      if (this.state.isLogin) {
        const { token, userId, tokenExpiration } = resData.data.login;
        if (token) this.context.login(token, userId, tokenExpiration);
      } else {
        alert('User created successfully! You can now login.');
        this.setState({ isLogin: true, loading: false });
      }
    } catch (err) {
      console.error(err);
      this.setState({ error: 'Something went wrong. Please try again.', loading: false });
    }
  };

  render() {
    const { isLogin, error, loading } = this.state;

    return (
      <div className="auth-page">
        <div className="auth-card">
          <h2 className="auth-title">{isLogin ? 'Login' : 'Sign Up'}</h2>
          {error && <div className="error-message">{error}</div>}
          <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="input-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" ref={this.emailEl} required />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={this.passwordEl} required />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>
          <button className="btn btn-secondary" onClick={this.switchModeHandler}>
            Switch to {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    );
  }
}

export default AuthPage;
