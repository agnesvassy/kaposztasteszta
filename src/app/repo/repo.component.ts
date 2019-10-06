import { Component, OnInit } from '@angular/core';
import { Repo } from '../repo';
import { Issue } from '../issue';
import { RepoService } from '../services/repo.service';

@Component({
  selector: 'app-repo',
  templateUrl: './repo.component.html',
  styleUrls: ['./repo.component.css']
})
export class RepoComponent implements OnInit {
  repo: Repo;
  issues: Issue[];
  reponame: string;
  username: string;

  constructor(private service: RepoService) {
    this.service.getRepoInfo().subscribe(repo => {
      console.log(repo);
      console.log(repo.items[0].id);
      console.log(repo.items.length);
      this.repo = repo;

      for(let i=0; i<this.repo.items.length; i++) {
        console.log('repoitemsname' + this.repo.items[i].name);
        console.log(this.repo.items[i].owner.login);
        this.service.updateUser(this.repo.items[i].owner.login);
        this.service.getRepoIssues().subscribe(issue => {
          console.log('fromConstructor issue title:'+issue.items[i].title);
          console.log('constr issue items:' + issue.items[i].id);
          console.log('constr issue length:'+issue.items.length);
          console.log(Object.keys(issue.items[i]));
          console.log(Object.values(issue.items[i]));
          console.log('issue' + issue.items);
          this.issues=Object.values(issue.items[i]);
          // console.log('issues :'+ this.issues);
          console.log('kecskethisissue'+this.issues);
        });
      }
    }
  )};

  findRepo() {
    this.service.updateRepo(this.reponame);
    this.service.getRepoInfo().subscribe(repo => {
      console.log(repo);
      console.log(repo.items[0].id);
      console.log(repo.items.length);
      this.repo = repo;
      for(let i=0; i<this.repo.items.length; i++) {
        console.log(this.repo.items[i].owner.login);
        this.service.updateUser(this.repo.items[i].owner.login);
        this.service.getRepoIssues().subscribe(issue => {
          console.log('fromConstructor issue title:'+issue.items[i].title);
          console.log('constr issue items:' + issue.items[i].id);
          console.log('constr issue length:'+issue.items.length);
          console.log(Object.keys(issue.items[i]));
          console.log(Object.values(issue.items[i]));
          console.log('issue' + issue);
          // this.issues=issue.items[i];
          // console.log('issues :'+ this.issues);
          console.log('kecskethisissue'+this.issues);
        });
      }
    }
  )};

  ngOnInit() {
  }

}
