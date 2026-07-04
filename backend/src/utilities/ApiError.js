class ApiError extends Error{
    constructor(statusCode,message="Something went Wrong",error=[],stack){
        super(message)
        this.statusCode=statusCode||404,
        this.message=message,
        this.data=null,
        this.error=error
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.stack)
        }
    }
}

export {ApiError}