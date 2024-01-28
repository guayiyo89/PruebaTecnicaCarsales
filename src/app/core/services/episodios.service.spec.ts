/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EpisodiosService } from './episodios.service';

describe('Service: Episodios', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EpisodiosService]
    });
  });

  it('should ...', inject([EpisodiosService], (service: EpisodiosService) => {
    expect(service).toBeTruthy();
  }));
});
