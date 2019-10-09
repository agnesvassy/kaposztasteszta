import { TestBed } from '@angular/core/testing';

import { RepoService } from './repo.service';

describe('RepoService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [RepoService]
  }));

  it('should be created', () => {
    const service: RepoService = TestBed.get(RepoService);
    expect(service).toBeTruthy();
  });
});
