class SnderMsg {
    static success(data = '') {
        return {
            status: true,
            status_code: 200,
            message: "success",
            data: data
        }
    }
    static success_creation(data=''){
        return {
            status: true,
            status_code: 201,
            message: "success",
            info: data
        }
    }
    static info(data = '') {
        return {
            status: true,
            status_code: 201,
            message: "success",
            info: data
        }
    }
    static failure(message = '') {
        return {
            status: false,
            status_code: 501,
            message: 'failed',
            info: message
        }
    }
    static unauthorized(data = '') {
        return {
            status: true,
            status_code: 401,
            message: "success",
            info: data
        }
    }
}

module.exports = SnderMsg;