import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatNativeDateModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatGridListModule,
        MatPaginatorModule,
        MatDialogModule
    ],

    exports: [MatButtonModule,
        MatToolbarModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatListModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatGridListModule,
        MatPaginatorModule,
        MatDialogModule
    ],
})

export class MaterialModule { }
