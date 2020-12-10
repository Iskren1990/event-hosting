import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MComment } from '../models/comments';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input() isOwner: Boolean;
  @Input() commentObj: MComment;
  @Input("tempId") userTempId: String;
  public isReveal: Boolean = false;
  public form: FormGroup;

  constructor(private commentsService: CommentsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      uname: [""],
      unameComment: ["", [Validators.required]]
    });
  }

  reveal() {
    this.isReveal = !this.isReveal;
  }

  reply(id) {
    this.form.value;
    const query: String = `?reply=${id}`;
    this.commentsService.put(query, { user: this.form.value.uname, comment: this.form.value.unameComment });
    this.form.reset();
  }

  delete(id) {
    const query: String = `?delete=${id}`;
    this.commentsService.delete(query);
  }
}
