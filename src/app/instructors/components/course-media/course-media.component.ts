import { Component } from '@angular/core';

@Component({
  selector: 'app-course-media',
  templateUrl: './course-media.component.html',
  styleUrls: ['./course-media.component.scss'],
})
export class CourseMediaComponent {
  selectedImage!: string;

  imageList = [
    '/assets/css.jpg',
    '/assets/design.jpg',
    '/assets/figma.jpg',
    '/assets/graphic.jpg',
    '/assets/html.jpg',
    '/assets/invision.jpg',
    '/assets/javascript.jpg',
    '/assets/react.jpg',
  ];

  onImageClick(image: string) {
    console.log(image);
    this.selectedImage = image;
  }
}
