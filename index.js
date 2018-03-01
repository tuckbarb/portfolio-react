//Portfolio

const MIN_WIN_HEIGHT = 500;


class Slide extends React.Component {

  constructor(props){
    super(props);
    this.state = { height:0 };
  }

  resizeHeight(){
    var sh = Math.max(window.innerHeight, MIN_WIN_HEIGHT);
    this.setState( {height:sh} );
  }

  componentDidMount() {
      this.resizeHeight();
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

        {this.props.children}

      </div>
    );
  }
}

class Mountains extends React.Component {

  constructor(props){
    super(props);
    this.state = { width:0,
                   shift:0};
  }

  resizeWidth(){
    this.setState( { width:window.innerWidth } );
  }

  scrollShift(){
    var relativeScroll = window.scrollY / window.innerHeight;

    var shf;

    if (relativeScroll < 1.1){
      shf = Math.min( (relativeScroll * 20) - 10, 0);
    }else{
      shf = -( Math.min( ((relativeScroll - 1.1) * 100) , 100) );
    }

    var sld = Math.min( (relativeScroll * 100) - 10, 100);

    this.setState( { shift:shf, slide:sld } );
  }

  componentDidMount() {
       window.addEventListener("resize", () => this.resizeWidth() );
       window.addEventListener("scroll", () => this.scrollShift() );

       this.resizeWidth();
       this.scrollShift();
   }

   componentWillUnmount() {
       window.removeEventListener("resize", () => this.resizeWidth() );
       window.removeEventListener("scroll", () => this.shiftPlace() );
   }

  render() {


    var style = {
      width : this.state.width+"px",
      bottom : this.state.shift+"%"
    }

    var overlayStyle = {
      height : this.state.slide+"%"
    }


    return (
      <div id="mountains" style={style}>
        <div id="dry"></div>
        <div id="snowy" style={overlayStyle}></div>
      </div>
    );
  }
}

class Content_Landing extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="greeting">
        <span>hi,<br/>
        i&#39;m tucker</span>
      </div>
    );
  }
}

class Content_Snow extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="greeting">
        <span>and i<br/>
        like efficient<br/>
        <em>design</em>
        <br/>&amp; effective<br/>
        <em>code</em></span>
      </div>
    );
  }
}

class Content_About extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div className="title">
        oof <br/>
        ow ow
      </div>
    );
  }
}



class Hello extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <span> hello </span>
    );
  }
}

class Portfolio extends React.Component {
  render() {


    return (
      <div>

        <Slide id="landing-page">
          <Content_Landing/>
        </Slide>

        <Slide id="snow-page">
          <Content_Snow/>
        </Slide>

        <Mountains />

        <Slide id="about-page">
          <Content_About/>
        </Slide>
        <Slide/>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
