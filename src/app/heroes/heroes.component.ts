import { Component, OnInit } from '@angular/core';
import { Hero } from './../hero';
import { HeroService } from './../hero.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  idclick: boolean = true;
  sortclick: boolean = false;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  idClick() {
    if(this.sortclick == true)
    {
      this.sortclick = false;
      this.idclick = true;
      this.getHeroes();
    }
  }

  sortClick() {
    if(this.idclick == true)
    {
      this.idclick = false;
      this.sortclick = true;
      this.getHeroesSort();
    }
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  // Manda los heroes ordenados por puntaje
  getHeroesSort(): void {
    this.heroService.getHeroesSort()
    .subscribe(heroes => this.heroes = heroes.sort((a,b) => b.score - a.score));
  }

  add(name: string, score: number): void {
    name = name.trim();
    score = 0;
    if (!name) { return; }
    this.heroService.addHero({ name, score } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
  
}
