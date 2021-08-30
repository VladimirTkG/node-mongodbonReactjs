import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'
import { useHttp } from '../hooks/http.hook'

export const CreatePage = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)
    const {request} = useHttp()
    const [link, setLink] = useState('')

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const pressHandler = async event => {
        if (event.key === 'Enter'){
            try{
                const data = await request('/api/link/generate', 'POST', {from: link}, {
                    Authorization: `Bearer ${auth.token}`
                })
                history.push(`/detail/${data.Link._id}`)
            }catch (e){}
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2"  style={{height: '150px',marginTop: '4rem', backgroundColor: '#a89cf7'}}>
                <div className="input-field">
                    <input placeholder="Links"
                        id="link"
                        type="text"
                        name="link"
                        className="validate"
                        style={{backgroundColor: '#a89cf7', marginTop: '5rem'}}
                        value={link}
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}/>
                    <label style={{fontSize: '5rem', color:'#5532a1'}} className="label-form" htmlFor="link">Pls link</label>
                </div>
            </div>
        </div>
    )
}