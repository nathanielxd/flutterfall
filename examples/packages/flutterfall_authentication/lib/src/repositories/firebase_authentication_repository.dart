import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutterfall_authentication/authentication.dart';

class FirebaseAuthenticationRepository implements IAuthenticationRepository {

  final _firebaseAuth = FirebaseAuth.instance;
  var _cachedAccount = Account.empty;

  @override
  Stream<Account> get stream => _firebaseAuth.authStateChanges()
    .map((firebaseUser) => _cachedAccount =  Account.fromFirebaseUser(firebaseUser));

  @override
  Account get currentAccount => _cachedAccount;

  @override
  Future<void> loginWithEmail(String email, String password) async {
    try {
      await _firebaseAuth.signInWithEmailAndPassword(email: email, password: password);
    }
    on FirebaseAuthException catch(e) {
      throw AuthenticationException.fromCode(e.code);
    }
    catch(e) {
      throw AuthenticationException.unknown();
    }
  }

  @override
  Future<void> logout() async => await _firebaseAuth.signOut();

  @override
  Future<void> registerWithEmail(String email, String password) async {
    try {
      final credentials = await _firebaseAuth.createUserWithEmailAndPassword(email: email, password: password);
      await credentials.user?.sendEmailVerification();
    }
    on FirebaseAuthException catch(e) {
      throw AuthenticationException.fromCode(e.code);
    }
    catch(e) {
      throw AuthenticationException.unknown();
    }
  }
}