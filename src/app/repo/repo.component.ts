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
        console.log(this.repo.items[i].owner.login);
        this.service.updateUser(this.repo.items[i].owner.login);
        this.service.getRepoIssues().subscribe(issue => {
          console.log(issue);
          console.log(issue.items[0].id);
          console.log(issue.items.length);
          this.issues[i] = issue;
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

    for(let i = 0;i < this.repo.items.length; i++) {
      console.log(this.repo.items[i].owner.login);
      this.service.updateUser(this.repo.items[i].owner.login);
      this.service.getRepoIssues().subscribe(issue => {
        console.log(issue);
        console.log(issue.items[0].id);
        console.log(issue.items.length);
        this.issues[i] = issue;
      });
    }
  }
)};

  ngOnInit() {
  }

}
