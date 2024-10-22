import React, { Component } from 'react';

class Salt extends Component {

  render() {
    var color = '#'
    switch(this.props.fill){
      case 'icon-ok':{
        color = '#8fb0de'
        break
      }
      case 'icon-warning':{
        color='#ffe284'
        break
      }
      case 'icon-danger':{
        color = '#d35454'
        break
      }
      default:{
        color = '#888888'
      }
    }
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width={this.props.size||32} height={this.props.size||32 }data-name="Layer 1" viewBox="0 0 24 30" x="0px" y="0px">
        <path fill={color} d="M22,19.541h-.655l-7.711-7.7a2.26,2.26,0,0,0-3.192,0l-7.7,7.7H2a.6.6,0,0,0,0,1.2h.946a.588.588,0,0,0,.082,0H21.056l.042,0,.041,0H22a.6.6,0,0,0,0-1.2Zm-17.563,0,6.853-6.853a1.059,1.059,0,0,1,1.5,0l6.86,6.853Zm5.726-3.195a.5.5,0,1,1-.707,0A.5.5,0,0,1,10.163,16.346Zm1.558-1.558a.5.5,0,1,1-.707,0A.5.5,0,0,1,11.721,14.789ZM8.594,17.915a.5.5,0,1,1-.707,0A.5.5,0,0,1,8.594,17.915ZM9.6,7.56a.5.5,0,1,1,.5.5A.5.5,0,0,1,9.6,7.56Zm0,2.219a.5.5,0,1,1,.5.5A.5.5,0,0,1,9.6,9.779ZM11.5,6.56a.5.5,0,1,1,.5.5A.5.5,0,0,1,11.5,6.56Zm0-2.2a.5.5,0,1,1,.5.5A.5.5,0,0,1,11.5,4.357Zm0,4.422a.5.5,0,1,1,.5.5A.5.5,0,0,1,11.5,8.779Zm1.083,7.562a.5.5,0,1,1,0,.707A.5.5,0,0,1,12.583,16.341Zm-.862,1.569a.5.5,0,1,1-.707,0A.5.5,0,0,1,11.721,17.91Z"/>
      </svg>
  )
 }

}

export default Salt;
