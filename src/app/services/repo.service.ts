import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Repo } from '../repo';
import { Issue } from '../issue';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class RepoService {

  private reponame: string;
  private username: string;

  // private clientid = '203dd913322b3db7d987';
  // private clientsecret = '020c0b3665296b33d758edeeced30473ef44f7da';
  private clientid = '44cf0145eded18767645';
  private clientsecret = '6400fc0894c551b2f633a13ee7d3089d0ed90d55';


  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
      console.log('service is now ready');
      // this.reponame = 'React-Redux-Firebase-App';
      // this.username = 'iamshaunjp';
      this.reponame = 'kaposztasteszta';
      this.username = 'agnesvassy';
      // this.reponame = 'bootstrap';
      // this.username = 'twbs';

      console.log('Default reponame:'+this.reponame+', username:'+this.username);
    }

    getRepoInfo (): Observable<Repo> {
      console.log('REPONAME1'+ this.reponame);
      console.log('https://api.github.com/search/repositories?q=' + this.reponame);
      return this.http.get<Repo>('https://api.github.com/search/repositories?q=' + this.reponame)
      .pipe(
        tap(_ => this.log('fetched repo')),
        catchError(this.handleError<Repo>('getRepoInfo', ))
      );
      console.log('REPONAME2'+ this.reponame);
    }

    getRepoIssues(): Observable<Issue> {
      console.log('https://api.github.com/search/issues?q=repo:' + this.username + '/' + this.reponame);
       return this.http.get<Issue>('https://api.github.com/search/issues?q=repo:' + this.username + '/' + this.reponame)
      // return this.http.get<Issue>('https://api.github.com/search/issues?q=repo:' + this.username + '/' + this.reponame + '?client_id=' + this.clientid + '&client_secret=' + this.clientsecret)
      .pipe(
        tap(_ => this.log('fetched issue')),
        catchError(this.handleError<Issue>('getRepoIssues', ))
      );
    }

    updateRepo(reponame: string) {
      this.reponame = reponame;
      console.log('reponame in service'+ this.reponame);
    }

    updateUser(username: string) {
      this.username = username;
    }


    /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        this.log('${operation} failed: ${error.message}');

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      this.messageService.add('RepoService: ${message}');
    }
  }
