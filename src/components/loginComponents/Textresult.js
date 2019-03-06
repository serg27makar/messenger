import React,{ Component } from 'react'

class Textresult extends Component {
    render(){
        let txt = this.props.txt;
        return(
            <div>
                <h2 style={{
                    fontStyle: 'italic',
                    color: 'red',
                }}>{txt}</h2>
            </div>
        )

    }
}

export default Textresult