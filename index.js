//Portfolio


const MIN_WIN_HEIGHT = 700;
const MIN_WIN_RATIO = 0.6;

const Fragment = React.Fragment;

function getWorkingHeight(){
  return Math.max(window.innerHeight, MIN_WIN_HEIGHT, window.innerWidth * MIN_WIN_RATIO);
}



class Slide extends React.Component {

  constructor(props){
    super(props);
    this.state = { height:0 };
  }

  resizeHeight(){
    var sh = getWorkingHeight();
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


    var style = {};

    if(this.props.type == "screen"){
      style.height = this.state.height + "px";
    }

    return (
      <div className="window-slide" id={this.props.id} style={style} >

        {this.props.children}

      </div>
    );
  }
}

//class for the animated mountains
class Mountains extends React.Component {

  constructor(props){
    super(props);
    this.state = { shiftx:0,
                   shifty:0  };
  }
  //called on scroll to shift mountains based on scrollY
  scrollShift(){
    //in units of which slide currently viewing, starting at zero
    var relativeScroll = window.scrollY / getWorkingHeight();
    var shfx;
    var shfy;
    //shift entire mountain unit vert until second slide, shift horiz during second
    if (relativeScroll < 1.1){
      shfy = Math.min( (relativeScroll * 20) - 10, 0); //enlarge mtns at first
      shfx = 0;
    }else{
      shfy = 0;
      shfx = -( Math.min( ((relativeScroll - 1.1) * 100) , 100) ); //slide offscreen horiz
    }
    //'rolling up' of the overlay mountains
    var osld = Math.min( (relativeScroll * 100) - 10, 100);

    this.setState( { shiftx:shfx, shifty:shfy, oslide:osld } );
  }

  componentDidMount() {
       window.addEventListener("scroll", () => this.scrollShift() );
       this.scrollShift();
   }

  componentWillUnmount() {
      window.removeEventListener("scroll", () => this.shiftPlace() );
  }

  render() {
    var style = {
      bottom : this.state.shifty + "%",
      right : this.state.shiftx + "%"
    }

    var overlayStyle = {
      height : this.state.oslide+"%"
    }
    return (
      <div id = "mountains" style={style}>
        <div id = "dry" > </div>
        <div id="snowy" style={overlayStyle}></div>
      </div>
    );
  }
}

class Content_Landing extends React.Component {
  render(){
    return(
      <div className="greeting">
        <span>Hi,<br/>
        I&#39;m Tucker</span>
      </div>
    );
  }
}

class Content_Snow extends React.Component {
  render(){
    return(
      <div className="greeting">
        <span>and I<br/>
        like good<br/>
        <em>design</em>
        <br/>&amp; solid<br/>
        <em>code.</em></span>
      </div>
    );
  }
}

class AboutListItem extends React.Component{
  render(){
    return(
      <li>
        <img src={this.props.icon} />
        <span>{this.props.children}</span>
      </li>
    );
  }
}

class Content_From extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <Fragment>


        <img id="from-header" src="res/from-header.svg" />
        <img id="maine-map" src="res/maine.svg" />

        <ul>
          <AboutListItem icon="res/cougar.svg">
            <em>Graduated:<br/> Mt Blue High School</em><br/>
            Farmington, Maine<br/>
            2017
          </AboutListItem>
          <AboutListItem icon="res/bates-logo.svg">
            <em>Attending:<br/> Bates College</em><br/>
            Lewiston, Maine<br/>
             2017-present
          </AboutListItem>
          <AboutListItem icon="res/atom.svg">
            <em>Studying:<br/> Physics and Math</em><br/>I&#39;m curious about what holds up the world around us
          </AboutListItem>
        </ul>
      </Fragment>
    );
  }
}




class AreaPlotItem extends React.Component {


  constructor(props){
    super(props);
    
    this.state = {
      step:0,
      size:0,
      active:null
    }

  }


  grow(){
    
    if(this.state.step < 3){
      this.setState({size:1});
      this.state.step++;
    }else{
      this.setState({size:0.6});
      clearInterval(this.state.active);
    }

  }

  componentDidMount(){
    this.state.active = setInterval(this.grow.bind(this), 80);
  }

  render(){

    var pStyle = {
      //backgroundImage: this.props.pstyle.backgroundImage,
      bottom: this.props.pstyle.bottom,
      left: this.props.pstyle.left,
      transform: 'scale(' + this.state.size + ')'

    }

    return(
      <img src={this.props.src} className = "point" title={this.props.title} style={pStyle}/>
    );
  }

}




class Content_Areas extends React.Component {


  constructor(props){
    super(props);

    this.state = {
      plots:[]
    };

    this.plots = [];

    this.graph = {
      viewed:false,
      plotter:null,
      data:[
        ['React', 'icons/react.svg', 20, 50],
        ['C++', 'icons/cpp.svg', 15, 60],
        ['PHP', 'icons/php.svg', 25, 10],
        ['Python', 'icons/py.svg', 35, 65],
        ['Java', 'icons/java.svg', 45, 10],
        ['Illustrator', 'icons/ai.svg', 55, 60],
        ['PhotoShop', 'icons/ps.svg', 65, 55],
        ['Javascript', 'icons/js.svg', 70, 35],
        ['CSS', 'icons/css.svg', 75, 50],
        ['HTML', 'icons/html.svg', 82, 50]
      ]
    };
  }
  generatePlot(){

    var points = [];

    if (this.graph.data.length > 0){
      var newPlots = this.state.plots.slice();
      newPlots.push(this.graph.data[0]);
      this.setState({plots:newPlots});
    } else {
      clearInterval(this.graph.plotter);
    }
    console.log(this.graph.data.length);
    this.graph.data.splice(0,1);



    console.log(this.state.plots);



  }

  checkScroll(){
    const graphLoc = document.getElementById("graph-block").getBoundingClientRect();
    const inView = graphLoc.top < (graphLoc.bottom / 2);

    if(inView && this.graph.viewed == false){
      this.graph.viewed = true;
      this.graph.plotter = setInterval(this.generatePlot.bind(this), 100);
    }
    
  }

  componentDidMount() {
       window.addEventListener("scroll", () => this.checkScroll() );
   }

  componentWillUnmount() {
      window.removeEventListener("scroll", () => this.checkScroll() );
  }

  render(){


    return(
      <Fragment>
        <div className = "title">
          What I&#39;m About
        </div>
        <div id = "graph-block">
          <img id="y-axis" src="res/graph-y.svg"/>
          <img id="x-axis" src="res/graph-x.svg"/>
          {this.state.plots.map((point, index) =>
              <AreaPlotItem key={"plot-"+index} 
                            title={point[0]}
                            pstyle={{ backgroundImage: 'url(' + point[1] +")",
                                      left: point[2]+"%",
                                      bottom: point[3]+"%"}}
                            src={point[1]}
              />)
          }
        </div>
      </Fragment>
    );
  }

}

class ProjectItem extends React.Component {

  render(){

    var divStyle = {
      backgroundImage: 'url(' + this.props.background + ')'
    };

    return(
      <a className = "project-item" href = {this.props.link} target="_blank">
        <div className="back" style = {divStyle}/>
        <div>
          <h3 className = "name"> {this.props.name} </h3>
          <span> {this.props.children} </span>
        </div>
      </a>
    );
  }

}

class Content_Done extends React.Component {

  constructor(props){
    super(props);
  }
  render(){
    return(
      <Fragment>
        <div className = "title">What I&#39;ve Done</div>
        <div id = "project-shelf">
          <ProjectItem background="res/site-khandex.png" name="Khandex" link="http://khandex.nordituck.com">
            A project I did many years ago, and revamped a few years after that. It indexes and allows you to search from user-created programs on from the site Khan Academy. Uses PHP/MySQL databases.
          </ProjectItem>
          <ProjectItem background="res/site-mbhs.png" name="Mt Blue HS Site" link="http://mbhs.mtbluersd.org">
            A complete redesign of the Mt Blue High School webpage. Not the most creatively liberated endeavor, being constrained by administrator request and the extremely limited space of Google Sites. Had a swell old time making some custom Google widgets and icons (site has seen some changes since my work on it).
          </ProjectItem>
          <ProjectItem background="res/site-cbb.png" name="'Professor Know-It-All'" link="https://github.com/irajwani/cbbhackathon">
            An app and webservice concept developed over 36 hours at the CBB Hackathon. The app is written in React Native, with the server-side processing done with Google Cloud API, and the web dashboard in ReactJS. I worked in a team and managed the GCPAPI and web dash.
          </ProjectItem>
        </div>
      </Fragment>
    );
  }

}



class Portfolio extends React.Component {
  render() {

    return (
      <div>
        <Slide type="screen" id="landing-page">
          <Content_Landing/>
        </Slide>

        <Slide type="screen" id="snow-page">
          <Content_Snow/>
        </Slide>

        <Mountains />

        <Slide type="screen" id="about-page">
          <Content_From/>
        </Slide>

        <Slide type="screen" id="areas-page">
          <Content_Areas/>
        </Slide>

        <Slide id="done-page">
          <Content_Done/>
        </Slide>
      </div>
    );
  }
}


// ========================================

ReactDOM.render(
  <Portfolio />,
  document.getElementById('root')
);
