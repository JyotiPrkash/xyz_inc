import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  @ViewChild('openImageModal') openImageModal: ElementRef;
  
  constructor(private server : ServerService) { }
  imagesList:any = [];
  selectedImageUrl:any;
  selectedImageAuthor:any;
  imagePage:number = 1;

  ngOnInit(): void {
    this.getImages();
    
  }

  getImages = function(){
    let imageQuery = '?page='+this.imagePage+'&limit=8';
    this.server.getRandomImages(imageQuery).subscribe((response) => {
      this.imagesList = response;
      console.log(this.imagesList)
    }, (error) => {
      this.imagesList = [];
    });
  }

  imagePageCall =function(direction){
    if(direction == 'next'){
      this.imagePage += 1;
    }else{
      this.imagePage -= 1;
    }
    let imageQuery = '?page='+this.imagePage+'&limit=8';
    this.server.getRandomImages(imageQuery).subscribe((response) => {
      this.imagesList = response;
      console.log(this.imagesList)
    }, (error) => {
      this.imagesList = [];
    });
  }

  selectImage = function(image){
    this.selectedImageAuthor = image.author;
    this.selectedImageUrl = image.download_url;
    this.openImageModal.nativeElement.click();
  }


}
