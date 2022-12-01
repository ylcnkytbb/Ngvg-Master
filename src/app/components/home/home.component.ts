import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm; 

  public sort!: string; //quickfix(!)
  public games!: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;


  constructor(
    private httpService: HttpService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
    this.searchForm = this.formBuilder.group({
      search: '',
    });

  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params
    .subscribe((params: Params) => {
      if (params['game-search']) {
        this.searchGames('metacrit', params['game-search']);
      } else {
        this.searchGames('metacrit');
      }
    });
  }

  searchGames(sort: string, search?: string): void { //home.component.htmlde searchGames'i çağırarak farklı özelliklere göre sıralamasını yaptırdık 
    this.gameSub = this.httpService
    .getGameList(sort, search)
    .subscribe((gameList: APIResponse<Game>) => {
      this.games = gameList.results;
      console.log(gameList);
    });


  }
    openGameDetails(id: string): void {
      this.router.navigate(['details', id]); //router'a bak !!
    }

    ngOnDestroy(): void { //
      if ( this.gameSub ) {
        this.gameSub.unsubscribe();
      }

      if ( this.routeSub ) {
        this.routeSub.unsubscribe();
      }
    }

}
