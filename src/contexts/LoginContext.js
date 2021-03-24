import React, {createContext, useState, useContext} from 'react'

const LoginContext = createContext()

export default function LoginProvider ({children}){

    //Navers
    const [navers, setNavers] = useState(null)
    const [currentNaver, setCurrentNaver] = useState(null)

    //Modais
    const [isDelete, setIsDelete] = useState(false)
    const [isInspect, setIsInspect] = useState(false)
    const [isConfirmation, setIsConfirmation] = useState(false)

    //Navigation na InputsPage
    const [isAdding, setIsAdding] = useState(false)
    const [isEditing, setIsEditing] = useState(false)

    //API (e login/logout)
    const [token, setToken] = useState(null)
    const apiURL = "https://navedex-api.herokuapp.com/v1";

    return (
        <LoginContext.Provider value={{
            apiURL,
            token,
            setToken,
            navers,
            setNavers,
            currentNaver,
            setCurrentNaver,
            isDelete,
            setIsDelete,
            isInspect,
            setIsInspect,
            isConfirmation,
            setIsConfirmation,
            isAdding,
            setIsAdding,
            isEditing,
            setIsEditing
        }} >{children}</LoginContext.Provider>
    )
}

export function useLogin(){
    const logContext = useContext(LoginContext)
    const { apiURL, navers, setNavers, currentNaver, setCurrentNaver, token, setToken, isDelete, setIsDelete, isInspect, setIsInspect, isConfirmation, setIsConfirmation, isAdding, setIsAdding, isEditing, setIsEditing } = logContext
    return { apiURL, navers, setNavers, currentNaver, setCurrentNaver, token, setToken, isDelete, setIsDelete, isInspect, setIsInspect, isConfirmation, setIsConfirmation, isAdding, setIsAdding, isEditing, setIsEditing }
}