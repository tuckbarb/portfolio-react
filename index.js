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
    this.state = { width:0,
                   shift:0    };
  }

  resizeWidth(){
    this.setState( { width:window.innerWidth } );
  }

  scrollShift(){
    var relativeScroll = window.scrollY / window.innerHeight;

    var shf;

    if (relativeScroll < 1){
      shf = Math.min( (relativeScroll * 20) - 10, 0);
    }else{
      shf = -( Math.min( ((relativeScroll - 1) * 110) , 100) );
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

class Portfolio extends React.Component {
  render() {


    return (
      <div>
        <Slide id="landing-page" greeting={
                                            <span>hi,<br/>
                                            i&#39;m tucker</span>
                                          } />
        <Slide id="snow-page" greeting={
                                        <span>and i<br/>
                                        like efficient<br/>
                                        <em>design</em>
                                        <br/>&amp; effective<br/>
                                        <em>code</em></span>} />
        <Mountains />
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
