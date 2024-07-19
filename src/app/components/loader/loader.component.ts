import { LoaderService } from './../../core/services/loader.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {
  private readonly loaderService = inject(LoaderService);
  public isLoading = this.loaderService.isLoading;
}
