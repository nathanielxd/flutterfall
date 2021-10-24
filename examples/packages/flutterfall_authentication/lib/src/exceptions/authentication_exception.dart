class AuthenticationException implements Exception {
  
  final String message;
  AuthenticationException(this.message);

  /// Create an authentication message from a firebase authentication exception code.
  factory AuthenticationException.fromCode(String code) {
    switch(code) {
      case 'invalid-email': return AuthenticationException('Email is not valid or badly formatted.');
      case 'user-disabled': return AuthenticationException('This user has been disabled. Please contact support for help.');
      case 'user-not-found': return AuthenticationException('No account with this email-password combination was found.');
      case 'wrong-password': return AuthenticationException('No account with this email-password combination was found.');
      case 'email-already-in-use': return AuthenticationException('An account with this email already exists. Please log in instead.');
      case 'operation-not-allowed': return AuthenticationException('This operation is not allowed. Please contact support for help.');
      case 'weak-password': return AuthenticationException('Password is too weak. Please try another password.');
      default: return AuthenticationException.unknown();
    }
  }

  /// Checks whether this exception has the same message as an another exception with [code].
  bool isSameAs(String code) => message == AuthenticationException.fromCode(code).message;

  /// An authentication error displaying the message "An unknown error has occured."
  factory AuthenticationException.unknown() => AuthenticationException('An unknown error has occured.');

  @override
  String toString() => message;
}