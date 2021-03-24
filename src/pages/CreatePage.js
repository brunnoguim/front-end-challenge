import '../styles/inputs.css'
import Header from "../components/Header"
import {useLogin} from '../contexts/LoginContext'
import { useEffect, useState } from "react"
import axios from 'axios'

const CreatePage = ({ history }) => {

    //Pegando os dados do context
    const { token, apiURL, setIsAdding, isConfirmation, setIsConfirmation } = useLogin()

    //Função para retornar ao dashboard
    const backToDashboard = () => {
        history.push('/dashboard')
        setIsAdding(false)
        setJob_role(null)
        setAdmission_date(null)
        setBirthdate(null)
        setName(null)
        setProject(null)
        setUrl(null)
    }

    //UseEffect do logout
    useEffect(() => {
        if (token === null){
            history.push('/')
        }
    }, [token])

    //Setando as variáveis que recebem os dados dos inputs
    const [ job_role, setJob_role ] = useState(null)
    const [ admission_date, setAdmission_date ] = useState(null)
    const [ birthdate, setBirthdate ] = useState(null)
    const [ name, setName ] = useState(null)
    const [ project, setProject ] = useState(null)
    const [ url, setUrl ] = useState(null)

    //Função adicionar Naver
    const handleAdicionar = async () => {

        //Pegando a data atual para comparar com as datas informadas pelo usuário
        let today = new Date().toISOString().slice(0, 10)

        //Checagem se todos os campos estão preenchidos
        if (
            job_role === null ||
            admission_date === null ||
            birthdate === null ||
            name === null ||
            project === null ||
            url === null
            ) {
                alert("Por favor preencha todos os campos antes de prosseguir")

        //Checagem se as datas informadas são inferiores à data atual
        } else if (
            admission_date > today ||
            birthdate > today ||
            birthdate > admission_date
            ){
                alert("Desculpe, mas não aceitamos cadastros de viajantes no tempo")
        } else {
        try {

            //Formatando as datas dos inputs para ficarem no padrão suportado pela API
            let BDyear = birthdate.slice(0, 4)
            let BDmonth = birthdate.slice(5, 7)
            let BDday = birthdate.slice(8)

            let ADyear = admission_date.slice(0, 4)
            let ADmonth = admission_date.slice(5, 7)
            let ADday = admission_date.slice(8)

            //Setando o objeto com os dados a serem adicionados  
            let dadosAdicionar = {
                job_role: job_role,
                admission_date: `${ADday}/${ADmonth}/${ADyear}`,
                birthdate: `${BDday}/${BDmonth}/${BDyear}`,
                project: project,
                name: name,
                url: url,
            }
            const resultAdicionar = await axios.post(`${apiURL}/navers`, dadosAdicionar, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(() => {
                setIsConfirmation(true)
            })
        } catch (e) {
            alert(e)
        }
        }
    }

    return (
        <div className="inputs-container">
            <Header />
            <div className="input-container">
                <div className="input-container-header">
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{backToDashboard()}}>
                        <path d="M12.51 1.86998L10.73 0.0999756L0.839996 9.99998L10.74 19.9L12.51 18.13L4.38 9.99998L12.51 1.86998Z" fill="black"/>
                    </svg>
                    <h1>Adicionar Naver</h1>
                </div>
                <div className="inputs-grid">
                    <div>
                        <strong>Nome</strong>
                        <input 
                        placeholder="Nome"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <strong>Cargo</strong>
                        <input 
                        placeholder="Cargo"
                        type="text"
                        value={job_role}
                        onChange={(e) => setJob_role(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <strong>Data de nascimento</strong>
                        <input 
                        placeholder="Data de nascimento"
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <strong>Data de admissão</strong>
                        <input 
                        placeholder="Data de admissão"
                        type="date"
                        value={admission_date}
                        onChange={(e) => setAdmission_date(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <strong>Projetos que participou</strong>
                        <input 
                        placeholder="Projetos que participou"
                        type="text"
                        value={project}
                        onChange={(e) => setProject(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <strong>URL da foto do Naver</strong>
                        <input 
                        placeholder="URL da foto do Naver"
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        ></input>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={handleAdicionar}>Salvar</button>
                </div>
            </div>

            {/* Render do modal da confirmação da adição*/}
            {isConfirmation ? (
                <div className="modal-background">
                    <div className="modal-container">
                        <h2>Naver Criado</h2>
                        <p>Naver criado com sucesso!</p>
                        <div className="buttons-container">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={()=>{setIsConfirmation(false)}}>
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#212121"/>
                        </svg>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default CreatePage