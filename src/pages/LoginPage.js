import '../styles/login.css'
import { useState } from "react"
import axios from "axios"
import {useLogin} from '../contexts/LoginContext'

const LoginPage = ({ history }) => {

    //Setando hook e dados do context
    const { apiURL, setToken } = useLogin()

    //Setando as variáveis que recebem os dados dos inputs
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    //Função do submit do login
    const handleLogin = async () => {
        const dadosLogin ={
            email: email.toLowerCase(), 
            password: senha
        }
        try{
            let result = await axios.post(`${apiURL}/users/login`, dadosLogin)
            localStorage.setItem("token", result.data.token)
            setToken(result.data.token)
            history.push('/dashboard')
        } catch (e) {
            alert("Usuário ou senha não encontrado, confira os dados de login e tente novamente")
        }
    }

    //Função do submit do Login via Enter nas input boxes
    const inputLogin = (evt) => {
        if (evt.key === "Enter"){
            handleLogin()
        }
    }


    return (
        <div className="login-container">
            <div className="login-container-logo">
                <svg width="236" height="60" viewBox="0 0 236 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M122.827 45.7818H130.554V19.6976H122.827V22.4392H122.75C121.823 20.7943 119.504 18.7577 115.255 18.7577C108.377 18.7577 102.273 24.1625 102.273 32.7006C102.273 40.142 107.064 46.6435 115.255 46.6435C118.268 46.6435 121.436 45.4685 122.75 42.9619H122.827V45.7818ZM122.827 32.6998C122.827 35.2064 121.204 39.358 116.414 39.358C111.777 39.358 110 35.2064 110 32.7782C110 29.8016 111.932 26.0417 116.336 26.0417C120.664 26.0417 122.827 29.5666 122.827 32.6998Z" fill="#212121"/>
                    <path d="M150.181 45.7034H142.454L133.645 19.6192H141.372L146.318 35.9121H146.395L151.572 19.6192H159.299L150.181 45.7034Z" fill="#212121"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M179.622 44.2146C181.785 42.7263 183.64 40.4547 184.876 37.5565V37.4782H176.995C175.913 38.8098 174.676 39.9064 172.281 39.9064C169.267 39.9064 166.717 38.1048 166.254 34.9716H185.572C185.577 34.9349 185.582 34.8985 185.587 34.8623C185.659 34.3579 185.726 33.8851 185.726 32.935C185.726 24.9452 179.931 18.6787 172.126 18.6787C164.245 18.6787 158.604 25.4152 158.604 32.7C158.604 40.5331 164.94 46.5646 172.281 46.5646C174.908 46.5646 177.458 45.7812 179.622 44.2146ZM172.204 25.3363C176.222 25.3363 177.767 28.2345 178.076 29.8012H166.331C166.717 28.2345 168.185 25.3363 172.204 25.3363Z" fill="#212121"/>
                    <path d="M197.703 19.6187H204.89V22.3603H204.967C205.585 21.107 206.976 18.6787 211.381 18.6787V26.5118C207.826 26.5902 205.353 27.3735 205.353 31.29V45.6246H197.626V19.6187H197.703Z" fill="#212121"/>
                    <path d="M226.912 26.9824C226.835 26.4341 226.758 25.0241 224.517 25.0241C222.894 25.0241 222.353 26.0424 222.353 26.7474C222.353 28.1574 224.285 28.9407 226.294 29.5673C230.622 30.8206 235.335 32.0739 235.335 37.7137C235.335 43.1969 230.544 46.6435 224.826 46.6435C220.963 46.6435 215.013 44.8419 214.317 37.9487H221.967C222.276 40.377 224.594 40.377 224.903 40.377C226.217 40.377 227.608 39.5937 227.608 38.3404C227.608 36.3038 225.676 36.0688 220.808 34.1889C217.485 33.0922 214.703 30.899 214.703 27.3741C214.703 22.2042 219.34 18.7577 224.672 18.7577C228.072 18.7577 233.944 20.0893 234.562 26.9824H226.912Z" fill="#212121"/>
                    <path d="M96.2453 21.0285C94.8544 19.7752 92.1499 18.7569 89.6771 18.7569C85.1181 18.7569 84.1136 21.1851 83.3408 22.4384H83.2636V19.6969H76.0773V45.7811H83.8045V29.8799C83.8045 28.7049 84.2681 27.6866 85.0408 26.9816C85.1181 26.9033 85.1954 26.825 85.2726 26.825C85.3499 26.7466 85.4272 26.6683 85.5045 26.6683H85.5817C86.1999 26.2767 86.8954 26.0417 87.6681 26.0417C88.6726 26.0417 89.5226 26.4333 90.2181 27.06C90.9908 27.7649 91.5317 28.7832 91.5317 29.9582V30.9765C91.5317 31.1332 91.5317 31.3682 91.5317 31.5248V45.7811H99.2589V29.4099C99.2589 24.3184 97.6362 22.2034 96.2453 21.0285Z" fill="#212121"/>
                    <path d="M190.749 45.7808C188.585 45.7808 186.885 44.0576 186.885 41.8643C186.885 39.671 188.585 37.9478 190.749 37.9478C192.913 37.9478 194.613 39.671 194.613 41.8643C194.613 43.9792 192.913 45.7808 190.749 45.7808Z" fill="#212121"/>
                    <path d="M28.8491 45.2685L28.1586 60L40.5882 43.8107L41.8926 31.688L52.0972 21.4834L60.0767 0L38.5933 7.90281L28.312 18.1074L16.1893 19.4118L0 31.8414L14.7315 31.1509L28.8491 45.2685Z" fill="#212121"/>
                    <path d="M15.4216 36.1374L23.8615 44.654L11.3551 49.1809L15.4216 36.1374Z" fill="#212121"/>
                </svg>
            </div>
            <div>
                <p>E-mail</p>
                <input 
                placeholder="E-mail"
                type="email"
                value={email}
                onKeyUp={inputLogin}
                onChange={(e) => setEmail(e.target.value)}
                ></input>
            </div>
            <div>
                <p>Senha</p>
                <input 
                placeholder="Senha"
                type="password"
                value={senha}
                onKeyUp={inputLogin}
                onChange={(e) => setSenha(e.target.value)}
                ></input>
            </div>
            <div>
                <button onClick={handleLogin}>Entrar</button>
            </div>
        </div>
    )
}

export default LoginPage
