// here we will create our utilites


// in this file we are creating our custom error class for the erros
// today i lean baout oops in js 


// here we are creating our custom error class by inheratating the orignal error class and we are adding our extra featyres


// we are extending the orignal error class

class ErrorResponse extends Error{

    constructor(message,statusCode){
        super()
        this.message= message ;
        this.statusCode= statusCode;
    }
}


// now you canimport thhis class and use this in our code 

export default ErrorResponse


// now you can throw newerror by creating new error  object if ErrorResponse class 
// use throw 
// using  ErrorResponse("messafe,statuscode")