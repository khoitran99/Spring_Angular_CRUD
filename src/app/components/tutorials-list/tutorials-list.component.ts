import { Component, OnInit } from '@angular/core';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {

  tutorials: any[] = [];
  currentTutorial: any;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.retrieveTutorials();
  }

  retrieveTutorials() {
    this.tutorialService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.tutorials = data === null ? [] : data;
        },
        error => {
          console.log(error);
        }
      );
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = null;
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: any, index: any) {
    this.currentIndex = index;
    this.currentTutorial = tutorial;
  }

  removeAllTutorials() {
    this.currentTutorial = null;
    this.tutorialService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveTutorials();
        },
        error => {
          console.log(error);
        }
      );
  }

  searchTitle() {
    this.currentTutorial = null;
    this.tutorialService.findByTitle(this.title)
      .subscribe(
        data => {
          this.tutorials = data === null ? [] : data;
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
  }
}
