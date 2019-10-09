
import React, {Component} from 'react';
import PesquisaItem from './PesquisaItem';

export default class Corpo extends Component{

    render(){
        return(
            <>
            {this.props.corpo.map( (item,i)=>{
                return (
                    <tr key={i}>
                    <td className="w-50">{item}</td>
                    <td className="w-50 text-center">{PesquisaItem(item, this.props.array)}</td>
                    </tr> 
                );
            })}
            </>
        )
    }
}