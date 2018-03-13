import {ImageProperties} from './image/image.component';
import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-image-row',
  templateUrl: './image-row.component.html',
  styleUrls: ['./image-row.component.css'],
  animations: [
  ]
})
export class ImageRowComponent implements OnInit {

  constructor() {}
  @Input() imagesDisplay: any[];
  displayArray = [
    [0, 2, 4, 6, 8],
    [1, 3, 5, 7]
  ];
  bigImageIndex = 2;
  resetDone = true;
  @ViewChild('parentDiv') parentDivRef:ElementRef;
  imageHeight = 100;
  imageWidth = 100;
  properties: any[];
  oldProperties: any[];
  parentDivHeightOffset = 0;
  updateAnimationSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');

  ngOnInit() {
    this.imageHeight = Math.floor(this.parentDivRef.nativeElement.clientHeight / 2);
    this.imageWidth = Math.floor(this.parentDivRef.nativeElement.clientWidth / 6);
    this.parentDivHeightOffset = this.parentDivRef.nativeElement.offsetTop;
    this.shuffleImages();
    console.log("parent Div Offset " + this.parentDivHeightOffset);
    this.updateAnimationSubject.next(this.bigImageIndex);
  };

  shuffleImages(){
    let nextPositionX = 0;
    let bottomIndex = 0;
    this.oldProperties = this.properties;
    let localProperties = new Array(9);
    for (let i = 0; i < 5; i++) {
      let displayIndex = this.displayArray[0][i];
      if (displayIndex == this.bigImageIndex) {
        localProperties[displayIndex] = {
          imageSizeX: this.imageWidth * 2,
          imageSizeY: this.imageHeight * 2,
          location: this.imagesDisplay[displayIndex],
          positionX: nextPositionX,
          positionY: this.parentDivHeightOffset,
          id: displayIndex
        };
        nextPositionX += this.imageWidth * 2;
        continue;
      }
      if (!isNaN(displayIndex)) {
        localProperties[displayIndex] = {
          imageSizeX: this.imageWidth,
          imageSizeY: this.imageHeight,
          location: this.imagesDisplay[displayIndex],
          positionX: nextPositionX,
          positionY: this.parentDivHeightOffset,
          id: displayIndex
        };
      }

      let displayIndex1 = this.displayArray[1][bottomIndex++];
      if (!isNaN(displayIndex1)) {
        localProperties[displayIndex1] = {
          imageSizeX: this.imageWidth,
          imageSizeY: this.imageHeight,
          location: this.imagesDisplay[displayIndex1],
          positionX: nextPositionX,
          positionY: this.parentDivHeightOffset + this.imageHeight,
          id: displayIndex1
        };
      }
      nextPositionX += this.imageWidth;
    }   
    
    this.oldProperties = this.properties ? this.properties : localProperties;
    this.properties = localProperties; 
  }
  
  mouseInEvent(imgNumber: number) {
    if (!this.resetDone) {
      return;
    }
    this.resetDone = false;
    let topRow = [];
    let bottomRow = [];
    for (let i = 0; i < 9;) {
      if (imgNumber == i) {
        topRow.push(i++);
      } else if (imgNumber - i == 1) {
        topRow.push(i++);
        if (i < 9) {
          topRow.push(i++);
          bottomRow.push(i++);
        }
      } else {
        topRow.push(i++);
        bottomRow.push(i++);
      }

    }
    this.bigImageIndex = imgNumber;
    this.displayArray = [topRow, bottomRow];
    this.shuffleImages();
    this.updateAnimationSubject.next(this.bigImageIndex);
  }

  mouseOutEvent() {
    this.resetDone = true;
  }
}
