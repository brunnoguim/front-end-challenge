import '../styles/dashboard.css'
import Header from '../components/Header'
import Title from '../components/Title'
import {useLogin} from '../contexts/LoginContext'
import axios from 'axios'
import { useEffect } from "react"

const DashboadPage = ({ history }) => {

    //Pegando os dados do context
    const { navers, setNavers, currentNaver, setCurrentNaver, token, apiURL, isDelete, setIsDelete, isInspect, setIsInspect, isAdding, setIsEditing, isEditing, isConfirmation, setIsConfirmation } = useLogin()

    //Função da atualização da lista dos navers
    const getNavers = () => {
        axios.get(`${apiURL}/navers`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) => {
            setNavers(response.data)
        })
        .catch((err) => {
            alert(err)
        })
    }

    //Função de deletar naver
    const deleteNaver = () => {
        axios.delete(`${apiURL}/navers/${currentNaver}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(() => {
            setCurrentNaver(null)
            setIsConfirmation(true)
        })
        .catch((err) => {
            alert(err)
        })
    }

    //UseEffect da lista dos navers
    useEffect(() => {
        getNavers()
    }, [setNavers, setCurrentNaver, navers])


    //UseEffect do logout
    useEffect(() => {
        if (token === null){
            history.push('/')
        }
    }, [token])

    //UseEffect do adicionar naver
    useEffect(() => {
        if (isAdding === true){
            history.push('/createnaver')
        }
    }, [isAdding])

    //UseEffect do editar naver
    useEffect(() => {
        if (isEditing === true){
            history.push('/editnaver')
        }
    }, [isEditing])
    
    return (
        <div className="dashboard-container">
            <Header />
            <Title />
            <div className="navers-container">

                {/* Render do dashboard*/}
                {(navers !== null) ? (
                    navers.map((naver) => {
                        return(
                            <div className="naver-card">
                                <img src={naver.url} alt={`Foto ${naver.name}`} onClick={()=>{setIsInspect(true); setCurrentNaver(naver)}}></img>
                                <strong>{naver.name}</strong>
                                <p>{naver.job_role}</p>
                                <>
                                    <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{setIsDelete(true); setCurrentNaver(naver.id)}}>
                                        <path d="M1 18H13V4H1V18ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z" fill="#212121"/>
                                    </svg>
                                    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{setIsEditing(true); setCurrentNaver(naver.id)}}>
                                        <path d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM18.41 4.34L14.66 0.589996L12.13 3.13L15.88 6.88L18.41 4.34Z" fill="#212121"/>
                                    </svg>
                                </>
                            </div> 
                        )
                    })
                ) : ('')}         
            </div>

            {/* Render do modal do delete */}
            {isDelete ? (
                <div className="modal-background">
                    <div className="modal-container">
                        <h2>Excluir Naver</h2>
                        <p>Tem certeza que deseja excluir este Naver?</p>
                        <div className="buttons-container">
                            <button onClick={()=>{setIsDelete(false)}} className="cancel-button">Cancelar</button>
                            <button onClick={()=>{setIsDelete(false); deleteNaver()}} className="confirm-button">Excluir</button>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Render do modal da confirmação */}
            {isConfirmation ? (
                <div className="modal-background">
                    <div className="modal-container">
                        <h2>Naver Excluído</h2>
                        <p>Naver excluído com sucesso!</p>
                        <div className="buttons-container">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{setIsConfirmation(false)}}>
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#212121"/>
                        </svg>
                        </div>
                    </div>
                </div>
            ) : null}

            {/* Render do modal do inspect */}
            {isInspect ? (
                <div className="modal-background">
                    <div className="modal-container-inspect">
                        <div className="inspect-image-container">
                            <img src={currentNaver.url} alt={`Foto ${currentNaver.name}`}></img>
                        </div>
                        <div className="inspect-text-container">
                            <h2>{currentNaver.name}</h2>
                            <p>{currentNaver.job_role}</p>
                            <strong>Idade</strong>
                            <p>Lorem Ipsum</p>
                            <strong>Tempo de Empresa</strong>
                            <p>Lorem Ipsum</p>
                            <strong>Projetos que participou</strong>
                            <p>{currentNaver.project}</p>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"  onClick={()=>{setIsInspect(false); setCurrentNaver(null)}}>
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#212121"/>
                            </svg>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default DashboadPage
