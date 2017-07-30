import { browser, by, element } from 'protractor';

export class KaradoxPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('kx-root h1')).getText();
  }
}
