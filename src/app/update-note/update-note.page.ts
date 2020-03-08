import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Note} from '../modal/Note';
import {ActivatedRoute, Router} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-update-note',
  templateUrl: './update-note.page.html',
  styleUrls: ['./update-note.page.scss'],
})
export class UpdateNotePage implements OnInit, AfterViewInit {
  clickedImage: string;
  note: Note = {
    id: '',
    title: '',
    content: '',
    createdAt: '',
    image:''
  };

  options: CameraOptions = {
    quality: 30,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(
    private camera: Camera,
    private activatedRoute: ActivatedRoute, 
    private fbService: FirebaseService, 
    private router: Router) {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.fbService.getNote(id).subscribe(noteData => {
        this.note = noteData;
      });
    }
  }

  updateNote() {
    this.fbService.updateNote(this.note).then(() => {
     this.router.navigate(['/']);
    }, err => {
    });
  }

  captureImage() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.clickedImage = base64Image;
      this.note.image=this.clickedImage
    }, (err) => {
      console.log(err);
      // Handle error
    });
  }
}
