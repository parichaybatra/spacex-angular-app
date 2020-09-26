import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../common/services/program.service';
import { HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-launches',
  templateUrl: './launches.component.html',
  styleUrls: ['./launches.component.scss'],
})
export class LaunchesComponent implements OnInit {
  defaultProgramLimit: number = 100;
  programLimit: number;
  selectedYear: string = '';
  selectedLaunch: string = '';
  selectedLand: string = '';
  public loading: boolean = true;
  programs = ['start']; //set for first time load

  constructor(
    private programService: ProgramService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    route.queryParams.subscribe((params) => {
      if (params['limit']) this.programLimit = params['limit'];
      else this.programLimit = this.defaultProgramLimit; // default limit if not geting from browser url
      if (params['launch_year'])
        this.selectedYear = params['launch_year'].toString();
      if (params['launch_success'])
        this.selectedLaunch = params['launch_success'];
      if (params['land_success']) this.selectedLand = params['land_success'];
    });
  }

  ngOnInit(): void {
    this.getProgramdata(); /*** load data for first time page load***/
  }

  onfilterClick(filter: any) {
    if (Object.keys(filter)[0] == 'launch_year')
      this.selectedYear = Object.values(filter)[0].toString();
    if (Object.keys(filter)[0] == 'launch_success')
      this.selectedLaunch = Object.values(filter)[0].toString();
    if (Object.keys(filter)[0] == 'land_success')
      this.selectedLand = Object.values(filter)[0].toString();

    this.getProgramdata(); /*** load data on filter click***/
  }

  getProgramdata() {
    this.loading = true;

    let params = new HttpParams().set('limit', this.programLimit.toString());

    if (this.selectedYear != '')
      params = params.set('launch_year', this.selectedYear);
    if (this.selectedLaunch != '')
      params = params.set('launch_success', this.selectedLaunch);
    if (this.selectedLand != '')
      params = params.set('land_success', this.selectedLand);

    this.programService.getPrograms(params).subscribe((data) => {
      this.programs = data;
      this.loading = false;

      //////// for reset router with updated params
      const paramsArray = params.keys().map((x) => ({ [x]: params.get(x) }));
      let newParam = {};
      paramsArray.forEach((key) => {
        Object.assign(newParam, key);
      });

      this.router.navigate([], {
        queryParams: newParam,
        relativeTo: this.route,
      });
    });
  }
}
