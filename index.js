
/*
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
*/



class Slide extends React.Component {

  constructor(props){
    super(props);
    var sh = window.innerHeight;
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

class Mountains extends React.Component {

  constructor(props){
    super(props);
    var sh = window.innerHeight;
    this.state = { height:sh };
  }

  resizeHeight(){
    this.setState( { height:window.innerHeight } );
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
      <div class="mountains" style={style}>
        <div id="dry"></div>
        <div id="snowy"></div>
      </div>
    );
  }
}

class Portfolio extends React.Component {
  render() {


    return (
      <div>
        <Slide id="landing-page" greeting={'woo\n slide 1'} />
        <Slide id="snow-page" greeting={'woo\n slide 2'} />
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
