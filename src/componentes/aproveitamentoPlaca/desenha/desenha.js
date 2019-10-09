import React, { useEffect } from 'react';

export default function Desenha(props) {


  useEffect(() => {
    const elemento = document.getElementById("area");

    let width = elemento.offsetWidth;
    let padLeft = elemento.style.paddingLeft;
    let padRight = elemento.style.paddingRight;

    var proporcao = (width / props.placaL);
    let largPlaca = (props.placaL * proporcao);
    let compPlaca = (props.placaC * proporcao);
    elemento.style.height = `${compPlaca}px`;

    var largPedaco = (props.pedacoL * proporcao);
    var compPedaco = (props.pedacoC * proporcao);

    let pedacos = document.getElementsByClassName("pedaco-item");
    let i = 0;
    while (i < pedacos.length) {
      pedacos[i].style.width = `${largPedaco}px`;
      pedacos[i].style.height = `${compPedaco}px`;
      i++
    }

  }, [props])


  //{`${props.pedacoL}x${props.pedacoC}`}

  return (
    <>
      <div className="text-center">
        {props.placaL}mm
      </div>
      <div className="d-flex align-items-center">
        <div style={{ width: "80%", border: "1px solid gray", margin: "auto", marginRight: "0px" }}
          id="area"
          className="d-flex flex-column" >
          {props.calculo.comprimento.map((linha, idx) => {

            return <div className="d-flex" key={idx}>

              {props.calculo.largura.map((item, index) => {
                return (
                  <div className="pedaco-item"
                    key={index}
                    style={{
                      border: "1px solid gray"
                    }}>

                    

                  </div>)
              })}
            </div>
          })}
        </div>
        <span className="mr-auto">
          {props.placaC}mm
        </span>
      </div>
    </>
  );
}
