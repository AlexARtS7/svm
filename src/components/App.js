import { useEffect } from 'react'
import { analyserInitiate } from '../services/analyserProcessor';
import MainPage from "../components/mainPage/MainPage";

const App = () => {

    useEffect(() => {
        analyserInitiate()
    },[])

    return (
        <div className="app">
            <MainPage/>
        
        </div>
    )
}

export default App;