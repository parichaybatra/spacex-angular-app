import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  @Input()
  get programs(): Array<any> {
    return this._programs;
  }
  set programs(value: Array<any>) {
    try {
      this._programs = JSON.parse(JSON.stringify(value));
    } catch (e) {
      this._programs = [];
    }
  }
  public _programs = [];

  defaultImage: string = './../../assets/default-image.png';

  ngOnInit(): void {}
}
