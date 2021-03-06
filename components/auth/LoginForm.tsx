import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { verify } from 'jsonwebtoken'
import { login } from '@/core/authRequests'

///
/// UserForm Section component
///
const UserFormSection = () => {
  
  const router = useRouter()

  const [ email, setEmail ] = useState("")
  const [ password, setpassword ] = useState("")
 
  //////////////////////////////

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setEmail(value)
  }

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setpassword(value)
  }

  const handleOnClick = async () => {

    if (email.length < 3) {
      alert("Set valid email!")
    } else {
      
      const res = await login({
        email: email,
        password: password
      })
      
      // successfully logged in
      if (res) {
        
        const decoded = verify(res.token, "secretsecretsecret");
        const email = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
        const id = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']

        localStorage.setItem('isLogged', 'true')
        localStorage.setItem('token', res.token)
        localStorage.setItem('user_email', email)
        localStorage.setItem('user_id', id)

        router.push('/')
      } else {
        alert("Wrong email or password")
      }
    }
  }
 
  //////////////////////////////

  const styles = {
    textField: {
      marginBottom: 10
    }
  }

  //////////////////////////////

  return (
    <div style={{
        float: 'left', 
        width: '100%',
        height: 300
      }}
    >
      <section>
        <header>
          <h2 style={{margin: '0 0 20px 10px'}}>Login</h2>
        </header>

        <div 
          style={{ width: 500, margin: 'auto' }} 
          className="form-group"
        >
          <label htmlFor="EmailInput">Email</label>
          <input 
            id="EmailInput" 
            type="text" 
            className="form-control" 
            placeholder="Enter your email"
            style={styles.textField} 
            onChange={handleEmailChange}
          />
          
          <label htmlFor="passwordInput">Password</label>
          <input 
            id="passwordInput" 
            type="password" 
            className="form-control" 
            aria-describedby="passwordHelp" 
            placeholder="Enter your password"
            style={styles.textField}
            onChange={handlePasswordChange} 
          />
          
          <button
            onClick={handleOnClick}
            style={{width: 150, fontSize: 14, float: 'right'}} 
            type="submit" 
            className="btn btn-secondary"
          > Log In </button>

          <Link href="/register">
            <a style={{color: '#666'}} className="navbar-brand">Do not have an account?</a>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default UserFormSection;
