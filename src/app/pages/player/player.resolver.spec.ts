import { TestBed } from '@angular/core/testing';

import { PlayerResolver } from './player.resolver';

describe('PlayerResolver', () => {
  let resolver: PlayerResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PlayerResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
