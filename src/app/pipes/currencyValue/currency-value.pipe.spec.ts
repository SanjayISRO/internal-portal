import { CurrencyValuePipe } from './currency-value.pipe';

describe('CurrencyValuePipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyValuePipe();
    expect(pipe).toBeTruthy();
  });
});
