import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event =>{
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try{
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        }catch(e){}
    }

    const loginHandler = async () => {
        try{
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token,data.userId,form.email)
        }catch(e){}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>OMG IT's TRIPLE</h1>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Autorization</span>
                        <div>

                            <div className="input-field">
                                <input placeholder="Email"
                                id="email"
                                type="text"
                                name="email"
                                className="validate yellow-input"
                                value={form.email}
                                onChange={changeHandler}/>
                                <label className="label-form" htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input placeholder="Password"
                                id="password"
                                type="password"
                                name="password"
                                className="validate yellow-input"
                                value={form.password}
                                onChange={changeHandler}/>
                                <label className="label-form" htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button style={{marginRight:10}}
                        className="btn yellow darken-4"
                        onClick={loginHandler}
                        disabled={loading}>
                            Login
                        </button>
                        <button
                        className="btn red darken-2"
                        onClick={registerHandler}
                        disabled={loading}>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}