import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css';
import { Input, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {signInWithEmailAndPassword, sendEmailVerification} from 'firebase/auth';
import {auth} from '../../firebase';
import { useAuthValue } from '../../../context/AuthContext'


function Login(){

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('') 
  const [error, setError] = useState('')
  const {setTimeActive} = useAuthValue()
  const navigate = useNavigate()

  const login = e => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      if(!auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser)
        .then(() => {
          setTimeActive(true)
          navigate('/verify-email')
        })
      .catch(err => alert(err.message))
    }else{
      navigate('/')
    }
    })
    .catch(err => setError(err.message))
  }

  return(
    <div className='center'>
      <div className='auth'>
        <h1>Log in</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={login} name='login_form'>
          <Input 
            prefix={<UserOutlined className="site-form-item-icon" />}
            type='email' 
            value={email}
            required
            placeholder="Enter your email"
            onChange={e => setEmail(e.target.value)}/>

          <Input 
            prefix={<LockOutlined className="site-form-item-icon" />}
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={e => setPassword(e.target.value)}/>

          <Button type='submit' className="btn" onClick={login}>Login</Button>
        </form>
        <p>
          Don't have and account?{' '}
          <Link to='/register' className="link">Create one here</Link>
        </p>
      </div>
    </div>
  )
}

export default Login