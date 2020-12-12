import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import * as env from '../../../environments/environment'
import { MComment } from '../models/comments';
const socketUrl = env.environment.socketUrl;

@Injectable()
export class SocketioService {

  private socket: Socket;
  constructor() { }

  setupSocketConnection(eventId, array) {
    array.length = 0;
    this.socket = io(socketUrl + `?chosen=${eventId}`).connect();
  }

  receiveAll(array) {
    array.length = 0;
    this.socket.on("allComments", (message) => { array.push(...message) });
  }

  sendMessage(message) {
    this.socket.emit("comment", message);
  }

  newMessage(array) {
    return this.socket.on("message", (message) => { array.unshift(message) });
  }

  sendReply(id, reply) {
    this.socket.emit("reply", { commentId: id, reply });
  }

  sendDelete(commentId) {
    this.socket.emit("delete", { commentId });
  }

  onDelete(array: MComment[]) {
    return this.socket.on("delete", (message) => {
      array.forEach((comment, index) => {        
        if (comment._id === message._id) {          
          array.splice(index, 1);
        }
      });
    });
  }

  newReply(array) {
    return this.socket.on("reply", (reply) => {
      array.forEach((comment) => {
        if (comment._id === reply._id) {
          comment.replies = reply.replies
        }
      });
    });
  }

  closeConnection() {
    this.socket.close();
  }
}
