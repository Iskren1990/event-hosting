import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MComment } from '../models/comments';
import { SocketioService } from '../services/socketio.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  @Input() isOwner: Boolean;
  @Input() commentObj: MComment;
  @Input("tempId") userTempId: String;
  public notDeleted: Boolean = true;
  public isNew: Boolean = true;
  public isReveal: Boolean = false;
  public form: FormGroup;
  public styles: Object;

  constructor(private fb: FormBuilder, private socket: SocketioService) {
    this.form = this.fb.group({
      uname: ["Anonymous"],
      unameComment: ["", [Validators.required]]
    });
  }

  reveal() {
    this.isReveal = !this.isReveal;
  }

  reply() {
    const {uname, unameComment} = this.form.value;
    this.socket.sendReply(this.commentObj._id, { user: uname, comment: unameComment });
    this.form.controls.unameComment.reset();
  }

  delete() {
    this.socket.sendDelete(this.commentObj._id);
  }
}
