import { Component } from '@angular/core';
import { LayoutComponent } from './laptop/components/layout/layout.component';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, LayoutComponent, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public isLoginPage: boolean = true;
  private urls = ['/sign-in', '/sign-up', '/forgot-password'];
  private routerSubscription: Subscription;

  constructor(private router: Router) { }

  ngOnInit() {
    this.checkLoginPage(this.router.url);

    // Subscribe to route changes
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkLoginPage(event.urlAfterRedirects);
      }
    });
  }

  private checkLoginPage(url: string): void {
    this.isLoginPage = this.urls.includes(url);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

}
