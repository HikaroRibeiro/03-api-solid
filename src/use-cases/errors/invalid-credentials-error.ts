export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credential has invalid!')
  }
}
