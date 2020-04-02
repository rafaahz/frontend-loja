import React, {useState, useEffect} from 'react';

export default function Warzone() {

    document.title = "WARZONE";
    const [lista, setLista] = useState([]);


    useEffect( ()=>{
        var listUser = ["alizera#11908", "eraserhead#11284", "ChutoGnomos#1775", "SaGaH#1620"];
        var objetos = [];

        listUser.forEach((str, i) => {
            let a = fetch(`https://my.callofduty.com/api/papi-client/stats/cod/v1/title/mw/platform/battle/gamer/${encodeURIComponent(str)}/profile/type/mp`)
            .then(response => {
            if(response.ok) return response.json();
            console.log(response.statusText)  // throw an error if there's something wrong with the response
            })
            .then(function handleData(res) {
                let username = res.data.username;
                let nickname = username.substring(0, username.indexOf("#"));

                let obj = {
                    player: nickname,
                    level: res.data.level,
                    data: res.data.lifetime.mode.br.properties
                };
                objetos.push(obj);
                if(objetos.length === listUser.length){
                    setLista(objetos);
                }
            })
            .then(v=> v)
            .catch(function handleError(error) {
                console.log(error)
            })
        });
    }, [])


  return (
    <div className="container">
        {
            lista ? lista.map( (v,i)=>{
                return (
                    <table key={i} className="table table-striped table-hover col-12 ml-auto mr-auto mb-5 border">
                    <tbody>
                        <tr>
                            <td>PLAYER</td>
                            <td className="text-center" style={{width: 35+"%"}}>{v.player}</td>
                        </tr>
                        <tr>
                            <td>LEVEL</td>
                            <td className="text-center">{v.level}</td>
                        </tr>
                        <tr>
                            <td>ABATES</td>
                            <td className="text-center">{v.data.kills}</td>
                        </tr>
                        <tr>
                            <td>MORTES</td>
                            <td className="text-center">{v.data.deaths}</td>
                        </tr>
                        <tr>
                            <td>DERRUBADO</td>
                            <td className="text-center">{v.data.downs}</td>
                        </tr>
                        <tr>
                            <td>K/D RATIO</td>
                            <td className="text-center">{parseFloat(v.data.kdRatio).toFixed(3)}</td>
                        </tr>
                        <tr>
                            <td>CONTRATOS</td>
                            <td className="text-center">{v.data.contracts}</td>
                        </tr>
                        <tr>
                            <td>QNT. JOGOS</td>
                            <td className="text-center">{v.data.gamesPlayed}</td>
                        </tr>
                        <tr>
                            <td>TEMPO DE JOGO (HR)</td>
                            <td className="text-center">{((parseInt(v.data.timePlayed)/60)/60).toFixed(0)}</td>
                        </tr>
                        <tr>
                            <td>QNT. VITORIAS</td>
                            <td className="text-center">{v.data.wins}</td>
                        </tr>

                    </tbody>
                </table>
                )
            }) : <p>Sem dados</p>
        }
    </div>
  );
}
