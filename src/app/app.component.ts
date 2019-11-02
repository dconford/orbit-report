import { Component, Input } from '@angular/core';
import { Satellite } from './satellite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  @Input() satellites: Satellite[];
  title = 'orbit-report';
  displayList: Satellite[];
  sourceList: Satellite[];
  searchTerm: string='ISS';
  name: string='';
  // constructor() {
  //   this.sourceList = [
  //     new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true),
  //     new Satellite("Cat Scanner", "Imaging", "2012-01-05", "LOW", true),
  //     new Satellite("Weber Grill", "Space Debris", "1996-03-25", "HIGH", false),
  //     new Satellite("GPS 938", "Positioning", "2001-11-01", "HIGH", true),
  //     new Satellite("ISS", "Space Station", "1998-11-20", "LOW", true),
  //   ];
  // }
  
  constructor() {
    this.sourceList = [];
    this.displayList = [];
    let satellitesUrl = 'https://handlers.education.launchcode.org/static/satellites.json';
  
    window.fetch(satellitesUrl).then(function(response) {
       response.json().then(function(data) {
 
          let fetchedSatellites = data.satellites;
          console.log("peeking at fetchedSatellites.name and .launchDate ", fetchedSatellites[1].name, fetchedSatellites[1].launchDate);
          for (let i = 0; i < fetchedSatellites.length; i++) {
            let satellite: object =new Satellite(fetchedSatellites[i].name, fetchedSatellites[i].type, fetchedSatellites[i].launchDate, fetchedSatellites[i].orbitType, fetchedSatellites[i].operational);
            console.log("peeking at Satellite Data " ,satellite );
            this.sourceList.push(satellite);
          }

          this.displayList = this.sourceList.slice(0);
       }.bind(this));
    }.bind(this));        
  }

  // Add event listener to table
// var el = document.getElementById("outside");
// el.addEventListener("click", modifyText, false);



  search(searchTerm: string): void {
    console.log("searchTerm is ", searchTerm);
    let matchingSatellites: Satellite[] = [];
    this.searchTerm = this.searchTerm.toLowerCase();
    for(let i=0; i < this.sourceList.length; i++) {
       let name = this.sourceList[i].name.toLowerCase();
       if (name.indexOf(searchTerm) >= 0) {
          matchingSatellites.push(this.sourceList[i]);
       }
    }
    // assign this.displayList to be the the array of matching satellites
    // this will cause Angular to re-make the table, but now only containing matches
    this.displayList = matchingSatellites;
 }
}


  // form.addEventListener('submit',function() {
  //   //let searchTerm = document.getElementById("searchField");
  //   let searchTerm = document.querySelector("input[name=query")
  //   //let searchButton = document.getElementById("searchButton")

  //    //search(searchTerm: string): void {
  //     console.log("hit search function");
  //     let matchingSatellites: Satellite[] = [];
  //     searchTerm = searchTerm.toLowerCase();
  //     for(let i=0; i < this.sourceList.length; i++) {
  //         let name = this.sourceList[i].name.toLowerCase();
  //         if (name.indexOf(searchTerm) >= 0) {
  //           matchingSatellites.push(this.sourceList[i]);
  //         }
  //     }
  //   // assign this.displayList to be the the array of matching satellites
  //   // this will cause Angular to re-make the table, but now only containing matches
  //   this.displayList = matchingSatellites;
    
  // }
