import '../styles/title.css'
import { useLogin } from '../contexts/LoginContext'

const Title = () => {

    //Setando o hook para o adicionar
    const { setIsAdding } = useLogin()

    return (
        <div className="title-container">
            <h2>Navers</h2>
            <button onClick={()=>{setIsAdding(true)}}>Adicionar Naver</button>
        </div>
    )
}

export default Title
