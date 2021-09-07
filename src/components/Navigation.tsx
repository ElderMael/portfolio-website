import React, {SyntheticEvent} from "react";
import './Navigation.css'

export class Navigation extends React.Component<{}, {}> {

  constructor(props: any) {
    super(props);
    this.showAbout = this.showAbout.bind(this);
    this.showHome = this.showHome.bind(this);
  }

  showAbout(event: SyntheticEvent): void {
    event.preventDefault();
  }

  showHome(event: SyntheticEvent): void {
    event.preventDefault();
  }

  render() {

    return (
        <nav className="navigation navbar navbar-dark animated fadeIn slow delay-5s">
          <a href="#home" className="btn btn-success btn-pill col-lg-2 col-sm-1" onClick={this.showHome}>
            <span className="icon-nav fas fa-2x fa-home"/>
            <span>Home</span>
          </a>
          <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1"
             target="_blank" rel="noopener noreferrer" href="https://github.com/ElderMael/">
            <span className="icon-nav fas fa-2x fa-code"/>
            <span>Code</span>
          </a>
          <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1"
             target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/miguelangelenriquez/">
            <span className="icon-nav fab fa-2x fa-linkedin"/>
            <span>Resume</span>
          </a>
          <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1"
             target="_blank" rel="noopener noreferrer" href="https://blog.eldermael.io/">
            <span className="icon-nav fab fa-2x fa-medium"/>
            <span>Blog</span>
          </a>
          <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1"
             target="_blank" rel="noopener noreferrer" href="https://twitter.com/eldermael">
            <span className="icon-nav fab fa-2x fa-twitter"/>
            <span>Social Media</span>
          </a>
            <a className="btn btn-outline-success btn-pill col-lg-2 col-sm-1"
               target="_blank" rel="noopener noreferrer" href="https://piratedevradio.tech">
                <span className="icon-nav fab fa-2x fa-microphone"/>
                <span>Podcast</span>
            </a>
        </nav>
    );

  }
}
