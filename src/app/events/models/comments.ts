import { MReply } from './replies';

export class MComment {
    tempId: String;
    owner: String;
    comment: String;
    eventId: String;
    replies?: MReply[];
    _id?: String;
    constructor({username, comment, eventId, tempId}){
        this.comment = comment;
        this.owner = username;
        this.eventId = eventId;
        this.tempId = tempId;
    }
}