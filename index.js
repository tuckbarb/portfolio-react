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
                   shiftx:0,
                   shifty:0  };
  }

  resizeWidth(){
    this.setState( { width:window.innerWidth } );
  }

  scrollShift(){
    var relativeScroll = window.scrollY / window.innerHeight;

    var shfx;
    var shfy;

    if (relativeScroll < 1.1){
      shfx = Math.min( (relativeScroll * 20) - 10, 0);
      shfy = 0;
    }else{
      shfx = 0;
      shfy = -( Math.min( ((relativeScroll - 1.1) * 100) , 100) );
    }

    var osld = Math.min( (relativeScroll * 100) - 10, 100);

    this.setState( { shiftx:shfx, shifty:shfy, oslide:osld } );
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
      bottom : this.state.shiftx+"%",
      right : this.state.shifty+"%",
    }

    var overlayStyle = {
      height : this.state.oslide+"%"
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

class AboutListItem extends React.Component{
  render(){
    return(
      <li>
        <img src={this.props.icon} />
        {this.props.children}
      </li>
    );
  }
}

class Content_About extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <div className="title">
          wow ok
        </div>

        <ul>

          <AboutListItem icon="test.png">
            Here we go look at me
          </AboutListItem>
          <AboutListItem icon="test.png">
            Here we go look at me
          </AboutListItem>
          <AboutListItem icon="test.png">
            Here we go look at me
          </AboutListItem>
        </ul>
        <ul>

          <AboutListItem icon="test.png">
            Here we go look at me
          </AboutListItem>
          <AboutListItem icon="test.png">
            Here we go look at me
          </AboutListItem>

        </ul>
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
