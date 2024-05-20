import {Component, OnInit} from '@angular/core';
import {EvernoteService} from "../shared/evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Note, Tag} from "../shared/note";
import {TagFactory} from "../shared/tag-factory";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'app-tag-details',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './tag-details.component.html',
  styles: ``
})
export class TagDetailsComponent implements OnInit{
  tag:Tag = TagFactory.empty();

  constructor(
    private app:EvernoteService,
    private route:ActivatedRoute,
    private router:Router,
    private toastr:ToastrService,
    public authService:AuthenticationService) {
  }

  ngOnInit(){
    const params = this.route.snapshot.params;
    this.app.getSingleTag(params['id']).subscribe((t:Tag)=>this.tag=t);
  }

  removeTag(){
    if (confirm("Tag wirklich löschen?")){
      this.app.removeTag(this.tag.id).subscribe(
        ()=> {
          this.router.navigate(['../'],
            {relativeTo:this.route});
          this.toastr.success('Tag gelöscht', "KWM Evernote");
        }
      )
    }
  }
}
