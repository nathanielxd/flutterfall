import 'package:equatable/equatable.dart';
import 'package:firebase_auth/firebase_auth.dart';

class Account extends Equatable {

  final String id;
  final String email;
  final bool emailVerified;

  const Account({
    required this.id,
    required this.email,
    required this.emailVerified,
  });

  Account copyWith({
    String? id,
    String? email,
    bool? emailVerified,
  }) {
    return Account(
      id: id ?? this.id,
      email: email ?? this.email,
      emailVerified: emailVerified ?? this.emailVerified,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'id': id,
      'email': email,
      'emailVerified': emailVerified,
    };
  }

  static const empty = Account(id: '', email: '', emailVerified: false);
  bool get isEmpty => this == empty;

  factory Account.fromFirebaseUser(User? user) {
    if(user == null) {
      return Account.empty;
    }
    return Account(
      id: user.uid, 
      email: user.email ?? '', 
      emailVerified: user.emailVerified
    );
  }

  factory Account.fromMap(Map<String, dynamic> map) 
  => Account(
    id: map['id'],
    email: map['email'],
    emailVerified: map['emailVerified'],
  );

  @override
  List<Object> get props => [id, email, emailVerified];
}
