import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Inserta un término de búsqueda en la secuencia observable. .
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // espera 300ms después de cada pulsación de tecla antes de considerar el término 
      debounceTime(300),

      // ignora el nuevo término si es igual al anterior
      distinctUntilChanged(),

      // cambia a una nueva búsqueda observable cada vez que cambia el término 
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}