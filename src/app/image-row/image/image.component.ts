import { trigger, transition, animate, style, state } from '@angular/animations';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ImageProperties {
  location: string;
  positionX: number;
  positionY: number;
  imageSizeX: number;
  imageSizeY: number;
  id: number;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  constructor() { }
  @Input() properties: ImageProperties;
  @Input() oldProperties: ImageProperties;
  @Input() updateAnimationSubject: BehaviorSubject<string>;
  
  @Output() mouseoverEvent: EventEmitter<number> = new EventEmitter();
  @Output() mouseoutEvent: EventEmitter<number> = new EventEmitter();
  animationClass: string;
  
  ngOnInit() {
    this.updateAnimationSubject.subscribe(this.updateAnimation.bind(this));
    
  }

  mouseOverChange(){
    this.mouseoverEvent.emit(this.properties.id);
    this.updateAnimationSubject.next("Change");
  }
  
  mouseOutChange(){
    this.mouseoutEvent.emit(this.properties.id);
  }
  
  updateAnimation(){
    let displacement = this.oldProperties.positionX + this.oldProperties.imageSizeX - this.properties.positionX - this.properties.imageSizeX;
    let displacement2 = this.oldProperties.positionX - this.properties.positionX;
    if(displacement > 0 || displacement2 > 0){
      this.animationClass = "leftRight";
    } else if(displacement < 0 || displacement2 < 0){
      this.animationClass = "rightLeft";
    }else{
      this.animationClass = undefined;
    }
  }
}
