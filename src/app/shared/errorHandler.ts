import { throwError } from 'rxjs';

export function handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
        if (error.status === 401) {
            return throwError('Unauthorized');
        }
        if (error.status === 500) {

            return throwError('Server down');
        } else {
            return throwError(error.json().error || 'Server error');
        }
       // errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);

}
