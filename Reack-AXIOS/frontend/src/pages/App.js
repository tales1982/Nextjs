import { getFunction, postFuntion } from "../services/APIService"; 

function App() {

  function btnGetFunctionClick(){
    getFunction()
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }


  function btnPostFunctionClick(){
    postFuntion()
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  return (
    <div className="App">
        <button onClick={btnGetFunctionClick}>Get Funtion</button>
        <button onClick={btnPostFunctionClick}>Post Funtion</button>
    </div>
  );
}

export default App;
