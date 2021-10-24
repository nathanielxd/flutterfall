import 'dart:async';

import 'package:flutterfall_authentication/authentication.dart';

class MockedAuthenticationRepository implements IAuthenticationRepository {

  static const _mockedAccount = Account(
    id: 'mock', 
    email: 'mock@email.com', 
    emailVerified: true
  );

  final _controller = StreamController<Account>.broadcast()..add(Account.empty);
  var _cachedAccount = Account.empty;

  @override
  Stream<Account> get stream => _controller.stream;

  @override
  Account get currentAccount => _cachedAccount;

  @override
  Future<void> loginWithEmail(String email, String password) async {
    await Future.delayed(Duration(seconds: 1));
    _controller.add(_cachedAccount = _mockedAccount);
  }

  @override
  Future<void> logout() async {
    await Future.delayed(Duration(seconds: 1));
    _controller.add(_cachedAccount = Account.empty);
  }

  @override
  Future<void> registerWithEmail(String email, String password) async {
    await Future.delayed(Duration(seconds: 1));
    _controller.add(_cachedAccount = _mockedAccount);
  }
}