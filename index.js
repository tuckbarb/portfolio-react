//Portfolio

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
      <div className="window-slide" id={this.props.id} style={style} >
        <div className="greeting">
          {this.props.greeting}
        </div>
      </div>
    );
  }
}

class Mountains extends React.Component {

  constructor(props){
    super(props);
    this.state = { width:window.innerWidth,
                   scroll:window.scrollY    };
  }

  resizeWidth(){
    this.setState( { width:window.innerWidth } );
  }

  shift(){

  }

  componentDidMount() {
       window.addEventListener("resize", () => this.resizeWidth() );
       window.addEventListener("scrollY", () => this.shift() );
   }

   componentWillUnmount() {
       window.removeEventListener("resize", () => this.resizeWidth() );
       window.removeEventListener("scrollY", () => this.shift() );
   }

  render() {


    var style = {
      width : this.state.width+"px"
    }

    return (
      <div id="mountains" style={style}>
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
        <Mountains />
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
