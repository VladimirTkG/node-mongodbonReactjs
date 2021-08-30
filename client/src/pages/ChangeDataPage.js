import React, { useEffect, useState } from 'react'
// import { AuthContext } from '../context/auth.context'
import { useAuth } from '../hooks/auth.hook'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

export const ChangeData = () => {

    const { loading, request, error, clearError } = useHttp()
    const message = useMessage()
    const { emailUser } = useAuth()

    const [form, setForm] = useState({
        old_pass: '', new_pass: ''
    })

    const [form1, setForm1] = useState({
        username: ''
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
        setForm1({ ...form1, [event.target.name]: event.target.value })
    }

    useEffect(() => {
        window.M.updateTextFields()
    }, [])
    //const auth = useContext(AuthContext)


    const passwordChangeHandler = async event => {
        try {
            const email = emailUser;
            const data = await request('api/profile/changepass', 'POST', { ...form, email })
            //         changePassword
            //         const data = await request('/api/profile/password', 'GET', { password }, {
            //             Authorization: `Bearer ${auth.userId}`
            //         })
            //         history.push(`/detail/${data.Link._id}`)
            message(data.message)
            setForm({ ...form, [event.target.name]: '' })
        } catch (e) { }
    }

    const usernameChangeHandler = async event => {
        try {
            const email = emailUser;
            const data = await request('api/profile/changeusername', 'POST', { ...form1, email })
            message(data.message)
            setForm1({ ...form1, [event.target.name]: '' })
        } catch (e) { }
    }




    return (
        <div>
            <div style={{ height: '322px', backgroundColor: '#a89cf7', marginTop: '5rem' }}>
                <span style={{ fontSize: '3rem', textAlign: 'center' }}>Change Password</span>
                <div style={{ marginTop: '5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                    <div className="input-field">
                        <input placeholder="Old password"
                            id="old_pass"
                            type="password"
                            name="old_pass"
                            className="validate yellow-input"
                            value={form.old_pass}
                            onChange={changeHandler} />
                        <label style={{color:'#5532a1'}} className="label-form" htmlFor="old_pass">Old password</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <div className="input-field">
                            <input placeholder="New password"
                                id="new_pass"
                                type="password"
                                name="new_pass"
                                className="validate yellow-input"
                                value={form.new_pass}
                                onChange={changeHandler} />
                            <label style={{color:'#5532a1'}} className="label-form" htmlFor="new_pass">New password</label>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', paddingBottom: '2rem' }}>
                    <button
                        className="btn red darken-5"
                        onClick={passwordChangeHandler}
                        disabled={loading}>
                        Okay
                    </button>
                </div>
            </div>
            <div style={{ backgroundColor: '#a89cf7', marginTop: '5rem' }}>
            <span style={{ fontSize: '3rem', textAlign: 'center' }}>Change Username</span>
                <div style={{ height: '200px', marginTop: '4rem', backgroundColor: '#a89cf7', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="input-field">
                        <input placeholder="Username"
                            id="username"
                            type="text"
                            name="username"
                            className="validate yellow-input"
                            style={{ width: '200px' }}
                            value={form1.username}
                            onChange={changeHandler} />
                        <label style={{color:'#5532a1'}} className="label-form" htmlFor="username">Username</label>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', marginTop: '2rem' }}>
                        <button
                            className="btn red darken-5"
                            onClick={usernameChangeHandler}
                            disabled={loading}>
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}