import React from 'react';
import style from './dashboard.module.css';
function App() {
  return (
 
    <div className="App">

      <div className="sidebar">
        <div className="logo_details">
          <h2>Admin</h2>
        </div>
        <ul>
          <li>
            <a href="#" className="active">
              <i className="bx bx-grid-alt"></i>
              <span className="links_name">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#">
              <i style={{color:'black'}} className="bx bx-user"></i>
              <span className="links_name">Profile</span>
            </a>
          </li>
          <li>
            <a href="#">
            <i style={{color:'black'}} className="fas fa-parking"></i>
              <span className="links_name">Parking Slot</span>
              
            </a>
          </li>
          <li className="login">
            <a href="#">
              <span className="links_name login_out">Login Out</span>
              <i style={{color:'black'}} className="bx bx-log-out" id="log_out"></i>
            </a>
          </li>
        </ul>
      </div>
      {/* End Sideber */}
      
      <section className="home_section">
      <div>
      <div className="topbar">
        <div className="toggle">
          <i className="bx bx-menu" id="btn"></i>
        </div>
        <div className="search_wrapper">
          <label>
            <span>
              <i className="bx bx-search"></i>
            </span>
            <input type="search" placeholder="Search..."/>
          </label>
        </div>
        {/* <div className="user_wrapper">
          <img src="img/logoo.png" alt="" />
        </div> */}
      </div>
      {/* <!-- End Top Bar --> */}
      <div className="card-boxes">
        <div className="box">
          <div className="right_side">
            <div className="numbers">0.0</div>
            <div className="box_topic">Assigned Parking Slots</div>
            <a style={{color:'black'}} href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
          <i className="fas fa-car"></i>
        </div>
        <div className="box">
          <div className="right_side">
            <div className="numbers">0.0</div>
            <div className="box_topic">Empty Parking Slots</div>
            <a style={{color:'black'}} href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
          </div>
          <i className="fas fa-car"></i>
        </div>
      </div>
    </div>
    </section>

        {/* tabular data */}
    
    </div>
      );
    }
  
export default App;
