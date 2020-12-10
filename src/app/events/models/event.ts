import { MComment } from './comments';

export class MEvent {
    eventName: String;
    eventCode: String;
    startDate: String;
    endDate: String;
    eventDescription: String;
    id: String;
    access: String;
    owner?: String;
    comments?: Array<MComment>;
    eventImage?: String;

    constructor({
        _id,
        eventName,
        eventCode,
        startDate,
        endDate,
        eventDescription,
        eventImage,
        access,
        owner,
    }) {
        this.id = _id;
        this.eventName = eventName;
        this.eventCode = eventCode;
        this.startDate = startDate;
        this.endDate = endDate;
        this.eventDescription = eventDescription;
        this.eventImage = eventImage;
        this.access = access;
        this.owner = owner;
    }
}