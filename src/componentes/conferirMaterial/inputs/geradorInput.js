import React from 'react';

export function GetInput(props) {

    let inputs = [];

    for (let i = 0; i < props.quantidade; i++) {

        inputs.push(
                <input type="text" key={i} id={props.id + i}
                className={"form-control text-center m-auto rounded " + props.class}
                style={{width: `${(100/props.quantidade)-3}%`}}
                onKeyUpCapture={props.altera}
                />
        )
    }

    return (
    <div className="row border-bottom mb-2 pb-2 w-100">
        <h3 className="col-12 text-center"> {props.msg} </h3>
        {inputs}
    </div>
    );
}

