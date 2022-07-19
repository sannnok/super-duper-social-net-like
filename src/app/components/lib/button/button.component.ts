import { Component, OnInit } from '@angular/core';
import { SidenavService } from 'src/app/services/core/sidenav.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  protected checked = false;

  constructor(protected sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

}
