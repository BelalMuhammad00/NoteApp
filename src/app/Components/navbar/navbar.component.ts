import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

 menuName:string='LOGIN';
 isLoggedIn: boolean = false;  // Set this to true if the user is logged in


 ngOnInit(): void {
  // Check if the user is logged in (adjust this logic based on your auth service)
  this.isLoggedIn = !!localStorage.getItem('userToken'); // Example check if token exists
}

 constructor(private _Router:Router) {

this._Router.events.subscribe({
  next:(response)=>{
    if(response instanceof NavigationEnd){
      this.menuName=response.url.replace("/","");
      if(this.menuName==='home'){
        this.isLoggedIn=true;
      }
    }
  }
})

 }

 logout(): void {
  // Your logout logic, e.g., clearing token from localStorage
  localStorage.removeItem('userToken');
  this.isLoggedIn = false;
}

}
