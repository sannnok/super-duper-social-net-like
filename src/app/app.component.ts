import { AfterViewInit, ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements AfterViewInit {
  constructor(public dialog: MatDialog) {}
  @ViewChild(TemplateRef) dialogTemplate!: TemplateRef<any>;
  
  ngAfterViewInit() {
    this.dialog.open(this.dialogTemplate);
  }
}

