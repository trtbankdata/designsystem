import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { GridCanvasComponent } from '../app-grid/grid-canvas/grid-canvas.component';

export const COMPONENT_DECLARATIONS: any[] = [
    HomeComponent,
    AppMenuComponent,
    GridCanvasComponent
];

export const PROVIDERS_DECLARATIONS: any[] = [
];

export const ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'grid',
        component: GridCanvasComponent
    }
];
