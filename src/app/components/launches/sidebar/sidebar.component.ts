import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() paramSelected = new EventEmitter<any>();

  NoOfYears: number;
  currentYear: number;
  startYear: number = 2006;
  programLimit: number;
  selectedYear: string = '';
  selectedLaunch: string = '';
  selectedLand: string = '';

  constructor(private route: ActivatedRoute) {
    route.queryParams.subscribe((params) => {
      if (params['launch_year']) this.selectedYear = params['launch_year'];
      if (params['launch_success'])
        this.selectedLaunch = params['launch_success'];
      if (params['land_success']) this.selectedLand = params['land_success'];
    });
  }

  onfilterClick(key: string, value: string) {
    if (key == 'launch_year') this.selectedYear = value;
    else if (key == 'launch_success') this.selectedLaunch = value;
    else if (key == 'land_success') this.selectedLand = value;

    this.paramSelected.emit({ [key]: value });
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.NoOfYears = this.currentYear - this.startYear + 1;
  }
}
