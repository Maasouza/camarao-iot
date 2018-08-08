import React, { Component } from 'react';

import './Card.css';

class Card extends Component{
    constructor(props){
        super(props);
        this.url = this.props.url || '';
        this.title = this.props.title;
        this.msg = this.props.msg
    }

    handleClick(path){
        if(path !=='')
            window.location = path;
    }

    render(){
        return(
            <div onClick={this.handleClick.bind(this,this.url)} className='Card'>
                <div className='Card-Title'>
                    {this.title}
                </div>
                <div className='Card-msg'>
                    {this.msg}
                </div>
            </div>
        )
    }


}

export default Card;
