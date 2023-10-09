import React from "react";
import { Link } from "react-router-dom";
function Header(){
    return(
        <nav class="navbar navbar-expand-lg navbar bg-primary">
        <div class="container-fluid">
          <Link class="navbar-brand" to="">HSP</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              
              <Link class="nav-link" to="admindashboard">Admin Dashboard</Link>
              
            </div>
          </div>
        </div>
      </nav>
        )
}
export default Header;  