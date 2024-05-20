import {Component, Input} from '@angular/core';
import {Catalogue} from "../shared/catalogue";
import {EvernoteListComponent} from "../evernote-list/evernote-list.component";
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {CatalogueFactory} from "../shared/catalogue-factory";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";

interface onInit {
}

@Component({
  selector: 'app-catalogue-details',
  standalone: true,
  imports: [
    EvernoteListComponent,
    RouterLink,
    NoteListItemComponent
  ],
  templateUrl: './catalogue-details.component.html',
  styles: ``
})
export class CatalogueDetailsComponent implements onInit{
   catalogue:Catalogue = CatalogueFactory.empty();

   constructor(private app:EvernoteService,
               private route:ActivatedRoute,
               private router:Router,
               private toastr:ToastrService,
               public authService:AuthenticationService) {
   }

   ngOnInit(){
     //wir dann aufgerufen, wenn die Komponente zur Ansicht gebracht wird
     const params = this.route.snapshot.params;
     this.app.getSingle(params['id']).subscribe((c:Catalogue)=>this.catalogue=c);
  }

  //Abfrage ob die Liste wirklich gelöscht werden soll
  removeCatalogue() {
    if(confirm("Liste wirklich löschen?")){
      this.app.remove(this.catalogue.id).subscribe(
        ()=> {
          this.router.navigate(['../'],
          {relativeTo:this.route});
          this.toastr.success('Liste gelöscht!', "KWM Evernote");
          }
      );
    }
  }
}
