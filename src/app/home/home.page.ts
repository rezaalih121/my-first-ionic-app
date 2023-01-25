import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { GalleryInterface } from './gallery.model';
import { PostInterface } from './postModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  api: string = `https://picsum.photos/v2/list?limit=12&page=`;

  posts: PostInterface[] = [];
  photos: GalleryInterface[] = [];

  currentPage: number = 1;
  isLoadingPhotos: boolean = false;

  constructor(
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getPhotos(this.currentPage).subscribe((data) => {
      this.photos = data;
      this.currentPage += 1;
    });
    this.detectLazyLoading();
  }

  detectLazyLoading() {
    this.isLoadingPhotos = true;

    const observer = new IntersectionObserver((enteries) => {
      this.showLoading();
      enteries.forEach((entery) => {
        if (entery.isIntersecting) {
          this.getPhotos(this.currentPage).subscribe((data) => {
            data.forEach((photo) => {
              this.photos.push(photo);
            });
            this.currentPage++;
            this.isLoadingPhotos = false;
          });
        }
      });
    });
    observer.observe(document.querySelector('.lazy-loading-detector')!);
  }
  getPostById(postId: number = 1): Observable<PostInterface[]> {
    return this.http.get(
      this.api.concat('/' + postId.toString())
    ) as Observable<PostInterface[]>;
  }
  getPhotos(page: Number = 1): Observable<GalleryInterface[]> {
    return this.http.get(this.api.concat(page.toString())) as Observable<
      GalleryInterface[]
    >;
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circles',
      duration: 3000,
    });

    loading.present();
  }
}
