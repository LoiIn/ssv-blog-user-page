import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertType } from 'src/app/_enum/alert';
import { Alert } from 'src/app/_models/alert';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  @Input() id = "default-alert";
  @Input() fade = true;

  alerts: Alert[] = [];
  aleartSubcription!:  Subscription;
  routeSubcription!: Subscription;

  constructor(
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.aleartSubcription = this.alertService.onAlert(this.id)
    .subscribe(alert => {
      if(!alert.message) {
        this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);
        this.alerts.forEach(x => delete x.keepAfterRouteChange);
        return
      }

      this.alerts.push(alert);

      if (alert.autoClose) {
        setTimeout(() => this.removeAlert(alert), 3000);
      }
    })

    this.routeSubcription = this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) {
        this.alertService.clear(this.id);
      }
    })
  }

  ngOnDestroy(): void {
    this.aleartSubcription.unsubscribe();
    this.routeSubcription.unsubscribe();
  }

  removeAlert(alert: Alert) {
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
        alert.fade = true;

        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
    } else {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissible', 'mt-4', 'container'];
            
    const alertTypeClass = {
        [AlertType.Success]: 'alert-success',
        [AlertType.Error]: 'alert-danger',
        [AlertType.Info]: 'alert-info',
        [AlertType.Warning]: 'alert-warning'
    }

    if (alert.type !== undefined) {
        classes.push(alertTypeClass[alert.type]);
    }

    if (alert.fade) {
        classes.push('fade');
    }

    return classes.join(' ');
  }
}
