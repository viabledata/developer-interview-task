import GovUKDetailsObserver from 'core/util/GovUKDetailsObserver';

describe('GovUKDetailsObserver utility', () => {

  let detailsObserver;

  beforeEach(() => {
    detailsObserver = new GovUKDetailsObserver(document.body);
  });

  it('should create a node property', () => {
    expect(detailsObserver.node).toBeInstanceOf(HTMLElement);
  });

  it('should return an observer', () => {
    expect(detailsObserver).toBeInstanceOf(GovUKDetailsObserver);
  });

  it('should create an internal MutationObserver', () => {
    detailsObserver.create();
    expect(detailsObserver.observer).toBeInstanceOf(MutationObserver);
    expect(detailsObserver.observer.observe).toHaveBeenCalledTimes(1);
  });

  it('should disconnect its observer', () => {
    detailsObserver.create();
    detailsObserver.destroy();
    expect(detailsObserver.observer.disconnect).toHaveBeenCalledTimes(1);
  });

});
