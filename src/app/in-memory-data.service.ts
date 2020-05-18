import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Winter Anim', score: Math.floor(Math.random() * 101) * 10 },
      { id: 12, name: 'Fang', score: Math.floor(Math.random() * 101) * 10 },
      { id: 13, name: 'Accalia', score: Math.floor(Math.random() * 101) * 10 },
      { id: 14, name: 'Eyolf', score: Math.floor(Math.random() * 101) * 10 },
      { id: 15, name: 'Kodiak', score: Math.floor(Math.random() * 101) * 10 },
      { id: 16, name: 'Cobalt', score: Math.floor(Math.random() * 101) * 10 },
      { id: 17, name: 'Meiko', score: Math.floor(Math.random() * 101) * 10 },
      { id: 18, name: 'Grey Wind', score: Math.floor(Math.random() * 101) * 10 },
      { id: 19, name: 'Koda', score: Math.floor(Math.random() * 101) * 10 },
      { id: 20, name: 'Ulrich', score: Math.floor(Math.random() * 101) * 10 }
    ];
    return {heroes};
  }

  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }
}