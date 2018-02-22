
/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
*/



class Slide extends React.Component {

  constructor(props){
    super(props);
    var sh = window.innerHeight+100;
    this.state = { height:sh };
  }

  resizeHeight(){
    this.setState( {height:window.innerHeight} );
  }

  componentDidMount() {
       window.addEventListener("resize", () => this.resizeHeight() );
   }

   componentWillUnmount() {
       window.removeEventListener("resize", () => this.resizeHeight() );
   }

  render() {


    var style = {
      height : this.state.height+"px"
    }

    return (
      <div class="window-slide" id={this.props.id} style={style} >
        <div class="greeting">
          {this.props.greeting}
        </div>
      </div>
    );
  }
}

class Portfolio extends React.Component {
  render() {


    return (
      <div>
        <Slide id="landing-page" greeting="woo land" />
        <Slide id="snow-page" greeting="woo snow" />
        <Slide />
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
