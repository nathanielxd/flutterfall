import 'package:flutter/material.dart';
import 'package:test/authentication/authentication.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

class AuthenticationPage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
		return BlocProvider(
      create: (_) => AuthenticationBloc(),
      child: AuthenticationView()
    );
  }
}
  