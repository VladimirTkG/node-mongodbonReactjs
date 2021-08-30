import { useCallback, useState, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)
    const [emailUser, setEmailUser] = useState(null)


    const login = useCallback((jwtToken, id, email) => {
        console.log(email)
        setToken(jwtToken)
        setUserId(id)
        setEmailUser(email)

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, emailUser: email
        }))

        setTimeout(
            () => {
                setToken(null)
                setUserId(null)
                setEmailUser(null)
                localStorage.removeItem(storageName)
            },
            60 * 60 * 1000
          );

    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)
        setEmailUser(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            login(data.token,data.userId, data.emailUser)
        }
        setReady(true)
    },[login])

    return {login, logout, token, userId, ready, emailUser}
}