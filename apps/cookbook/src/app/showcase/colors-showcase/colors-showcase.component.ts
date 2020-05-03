import { Component, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';

import { ColorHelper, KirbyColor } from '@kirbydesign/designsystem';

@Component({
  selector: 'cookbook-colors-showcase',
  templateUrl: './colors-showcase.component.html',
  styleUrls: ['./colors-showcase.component.scss'],
})
export class ColorsShowcaseComponent implements OnInit {
  selectedColor = 'primary';
  selectedOnColor = 'primary-contrast';
  brandColors = ColorHelper.brandColors;
  notificationColors = ColorHelper.notificationColors;
  systemColors = ColorHelper.systemColors;
  textColors = ColorHelper.textColors;
  prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeEnabled: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {}

  onColorClick(color: KirbyColor) {
    this.selectedColor = color.name;
    this.selectedOnColor = color.name + '-contrast';
  }

  ngOnInit(): void {
    this.setDarkMode(this.prefersDark.matches);
    this.prefersDark.addListener((e) => {
      this.setDarkMode(e.matches);
      this.changeDetectorRef.detectChanges();
    });
  }

  setDarkMode(enabled) {
    this.darkModeEnabled = enabled;
    enabled
      ? this.renderer.addClass(document.body, 'dark')
      : this.renderer.removeClass(document.body, 'dark');
  }
}
