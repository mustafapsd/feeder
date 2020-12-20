import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  stock: number = 0;
  container: number = 0;
  data: any;
  lastupdate: string = null;
  willadd = 0;
  loading: boolean = true;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.http.get("https://cors-anywhere.herokuapp.com/https://tranquil-oasis-23659.herokuapp.com/stock").subscribe((resp) => {
      this.data = JSON.parse(JSON.stringify(resp))

      this.stock = this.data.stock
      this.container = this.data.container
      this.lastupdate = this.data.lasttime

      if (this.container < 0) {
        this.container = 0;
      }

      if (this.stock < 0) {
        this.stock = 0;
      }

      this.loading = false;
    })
    setTimeout(() => {
      let overlay = document.getElementById("overlay") as HTMLElement

      overlay.classList.add("remove")
    }, 2000);
  }

  post() {

    var data = {
      container: this.container,
      stock: this.stock,
      add: true,
      willadd: this.willadd
    }

    console.log(data);
    
    this.http.post("https://cors-anywhere.herokuapp.com/https://tranquil-oasis-23659.herokuapp.com/refresh", data).subscribe((resp)=> {
      alert("Succesful!")
    })
  }
}
