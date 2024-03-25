/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BadRequestException,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpStatus,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionsFilter implements ExceptionFilter {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    catch(exception: any): any {
        const message = exception?.response.message;
        if (exception instanceof NotFoundException) {
            return new NotFoundException({
                statusCode: HttpStatus.NOT_FOUND,
                message: exception.message,
            });
        } else if (exception instanceof UnauthorizedException) {
            return new UnauthorizedException({
                statusCode: HttpStatus.UNAUTHORIZED,
                message: exception.message,
            });
        } else if (exception instanceof ForbiddenException) {
            return new ForbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: exception.message,
            });
        } else if (exception instanceof BadRequestException) {
            return new BadRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: message ?? exception?.message,
            });
        } else {
            return new InternalServerErrorException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: `Internal Server Error: ${exception.message})`,
            });
        }
    }
}
