import { Component, OnInit, ViewChild } from '@angular/core';
import { ArticleModel } from './ArticleModel';
import { ArticleService } from './article.service';
import { Sort, MatSort } from '@angular/material';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  hidden = {};
  delIcon = -1;
  delBtnHover = 0;

  articles: ArticleModel[];
  displayedColumns: string[] = ['title', 'created_at', 'del'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private articleService: ArticleService){ }

  ngOnInit(){
    this.getAllArticles();
  }

  getAllArticles(): void {
    this.articleService.getAllArticles().subscribe(data => {
      console.log("articles retrieved succesfully");

      data.sort((a, b) => {
        let dateA = new Date(a.created_at);
        let dateB = new Date(b.created_at);
        return dateB.valueOf()-dateA.valueOf();
      })

      this.articles = data;
    });
  }

  deleteArticle(article: ArticleModel){
    //hide element
    this.hidden[article._id] = true;

    this.articleService.deleteArticle(article._id).subscribe(data => {
      this.getAllArticles();
    });
  }

  showDeleteIcon(swt: number){
    this.delIcon = swt;
  }

  onRowClicked(obj: any){
    console.log(obj);
    //open link
    let url;

    if (!this.delBtnHover){
      (obj.story_url === null) ? url = obj.url : url = obj.story_url;
      window.open(url, "_blank");
    }
    
  }

  mouseoverDelBtn(){
    this.delBtnHover = 1;
  }

  mouseleaveDelBtn(){
    this.delBtnHover = 0;
  }

}
