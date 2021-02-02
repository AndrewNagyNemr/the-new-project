import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(err) {
    alert('Un-expected error occurs');
    console.log("err");
  }
}
