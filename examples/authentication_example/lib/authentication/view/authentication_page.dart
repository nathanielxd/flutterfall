import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterfall_authentication/authentication.dart';
import 'package:authentication_example/authentication/authentication.dart';

class AuthenticationPage extends StatelessWidget {

  const AuthenticationPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => AuthenticationCubit(authenticationRepository: context.read<FirebaseAuthenticationRepository>()),
      child: AuthenticationView(),
    );
  }
}