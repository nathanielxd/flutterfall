import 'package:flutterfall_authentication/authentication.dart';

abstract class IAuthenticationRepository {
  /// Stream of current authenticated account.
  Stream<Account> get stream;
  /// Get current authenticated account.
  Account get currentAccount;
  /// Log in into an existing account with email and update [stream].
  Future<void> loginWithEmail(String email, String password);
  /// Create a new account with email and update [stream].
  Future<void> registerWithEmail(String email, String password);
  /// Log out of the current authenticated account and update [stream].
  Future<void> logout();
}