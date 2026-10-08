const AppException = require('../../common/exceptions/AppException');

class InvalidCredentialsException extends AppException {
    constructor() {
        super('Credenciales inválidas.', 401);
    }
}

class EmailNotVerifiedException extends AppException {
    constructor() {
        super('El correo electrónico no ha sido verificado.', 403);
    }
}

module.exports = {
    InvalidCredentialsException,
    EmailNotVerifiedException
};
