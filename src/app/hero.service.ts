import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({ providedIn: 'root' })
export class HeroService {
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: envía el error a la infraestructura remota de logging
      console.error(error);
  
      // TODO: mejor trabajo en transformar el error para el consumo de usuarios 
      this.log(`${operation} failed: ${error.message}`);
  
      // Deja que la app siga corriendo al regresar un resultado vacío.
      return of(result as T);
    };
  }

  // Manda el listado desde la BD y lo ordena para mandarlo como un Observable ordenado
  getHeroesSort(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      map(heroes => heroes.sort((a,b) => b.score - a.score)),
      tap(_ => this.log('Héroes recuperados por puntaje')),
      catchError(this.handleError<Hero[]>('getHeroesSort', []))
    );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('Héroes recuperados')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Héroe recuperado id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: actualiza el heroe en el servidor  */
  updateHero (hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Héroe actualizado id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: añade un nuevo héroe en el servidor */
  addHero (hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Héroe añadido w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: elimina al héroe del servidor */
  deleteHero (hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Héroe eliminado id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* Obtiene héroes cuyo nombre contienen el término buscado */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // si no hay término de búsqueda, regresa un arreglo vacío.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`Se encontraron héroes que coinciden con "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}
