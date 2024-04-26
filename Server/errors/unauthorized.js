const CustomAPIError = require('./custom-error');
const{StatusCodes}= require('http-status-codes');

class UnauthoriseError extends CustomAPIError{
    constructor(message,statusCode){
        super(message);
        this.statusCode=StatusCodes.FORBIDDEN;//403
    }
}

module.exports=UnauthoriseError;