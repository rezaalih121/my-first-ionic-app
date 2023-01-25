import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  api: string = `https://pokeapi.co/api/v2/pokemon`;

  offset: number = 10;
  limit: number = 10;
  pageNumber: number = 1;
  pokemons: any[] = [];

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.getMoreData(result.name).subscribe((pokemon: any) => {
          this.pokemons.push(pokemon);
        });
      });
    });
  }

  getPokemons() {
    this.offset = this.pageNumber * this.limit;
    this.pageNumber = this.pageNumber + 1;
    return this.http.get(
      this.api + `?offset=${this.offset}&limit=${this.limit}`
    );
  }
  loadMorePokemons() {
    this.getPokemons().subscribe((response: any) => {
      response.results.forEach((result: any) => {
        this.getMoreData(result.name).subscribe((pokemon: any) => {
          this.pokemons.push(pokemon);
        });
      });
    });
  }
  getMoreData(name: string) {
    return this.http.get(this.api + `/${name}`);
  }

  onIonInfinite(ev: any) {
    console.log(this.pageNumber);
    console.log(this.pokemons);

    this.loadMorePokemons();

    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
}
