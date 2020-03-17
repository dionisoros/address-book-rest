import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatOptionModule} from "@angular/material/core";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [

    // material modules
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatOptionModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSortModule,
    MatRadioModule,
    MatMenuModule,
    FlexLayoutModule,
    MatGridListModule,
    MatTooltipModule,
    MatPaginatorModule
  ]
})
export class SharedModule {}
