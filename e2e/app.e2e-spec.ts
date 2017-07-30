import { KaradoxPage } from './app.po';

describe('karadox App', () => {
  let page: KaradoxPage;

  beforeEach(() => {
    page = new KaradoxPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to kx!');
  });
});
