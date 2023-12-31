import { Component } from '@angular/core';
import { CreateCourseService } from '../../services/create-course.service';

@Component({
  selector: 'app-course-media',
  templateUrl: './course-media.component.html',
  styleUrls: ['./course-media.component.scss'],
})
export class CourseMediaComponent {
  selectedImage!: string;

  constructor(private createCourseService: CreateCourseService) {}

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
    this.selectedImage = image;
    this.createCourseService.courseMedia$.next(image);
  }
}
