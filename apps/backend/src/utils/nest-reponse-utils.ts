import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  CredentialsInvalid,
  Forbidden,
  RequiredField,
  TokenInfo,
  UserAlreadyRegistered,
  ValidationError,
} from 'src/core/auth';

export function mapException(err: any) {
  if (err instanceof UserAlreadyRegistered) {
    throw new ConflictException(err.code);
  }
  if (err instanceof RequiredField) {
    throw new BadRequestException({
      code: err.code,
      field: err.field,
    });
  }
  if (err instanceof ValidationError) {
    throw new BadRequestException({
      code: err.code,
      field: err.code,
    });
  }
  if (err instanceof CredentialsInvalid) {
    throw new UnauthorizedException(err.code);
  }
  if (err instanceof Forbidden) {
    throw new ForbiddenException(err.code);
  }
  console.error(err);
  throw new InternalServerErrorException('INTERNAL_SERVER_ERROR');
}

export async function getAuthorizationHeader(
  hasherService,
  request: Request,
): Promise<TokenInfo> {
  if (!request.headers['authorization']) {
    throw new ForbiddenException('MISSING_AUTHORIZATION_HEADER');
  }
  try {
    const tokenDecoded = await hasherService.decode(
      request.headers['authorization'] as string,
    );
    return tokenDecoded;
  } catch {
    throw new ForbiddenException('INVALID_AUTHORIZATION_HEADER');
  }
}
