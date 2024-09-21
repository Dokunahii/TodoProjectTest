import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import AccountContext from '../contexts/AccountContext'
import { useNavigate } from 'react-router-dom'
import CurrentAccountContext from '../contexts/CurrentAccountContext'

export default function Login() {
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isSigningUp, setIsSigningUp] = useState(false)
    const accounts = useContext(AccountContext).accounts
    const setAccounts = useContext(AccountContext).setAccounts
    const navigate = useNavigate()
    const setCurrentAccount = useContext(CurrentAccountContext).setCurrentAccount
    const currentAccount = useContext(CurrentAccountContext).currentAccount
    
    useEffect(() => {
      setCurrentAccount(null)
    
    }, [])
    

    const toggleSignUp = () => {
        setIsSigningUp((previsSigningUp) => previsSigningUp = !isSigningUp)
    }

    
    const LogIn = () => {
        const findUserId = accounts.find((account) => account.userId == userId)
        const findPassword = findUserId.password == password
        if (findUserId && findPassword) {
            setCurrentAccount(userId)
        } 
    }

    useEffect(() => {
        console.log(currentAccount)
      if (currentAccount == userId) {
        navigate(`/home`)
      }
    }, [currentAccount, navigate])
    
    const SignUpCheck = () => {
        if (password == confirmPassword) {
            SignUp()
        }
    }

    const SignUp = () => {
        setAccounts([...accounts, {userId,password}])
        setUserId("")
        setPassword("")
        setIsSigningUp(false)
    }
    
    const handleSubmit = () => {
        isSigningUp ? SignUpCheck():LogIn()
    }

  return (
    <>
        <h1>{isSigningUp ? "Sign Up":"Login"}</h1>
        <Form>
            <Form.Group>
                <Form.Label>User ID:</Form.Label>
                <Form.Control
                    type='text'
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type='text'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            {isSigningUp &&
                <Form.Group>
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type='text'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>
            }
            <Button type="submit" onClick={handleSubmit}>{isSigningUp ? "Sign Up":"Login"}</Button>
        </Form>
        <p>{isSigningUp ? "Already":"Don't"} have an account?<span onClick={toggleSignUp}><u>{isSigningUp ? "Login":"Sign Up"}</u></span></p>
    </>
  )
}
