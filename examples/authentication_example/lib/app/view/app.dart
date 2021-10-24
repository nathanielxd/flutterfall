import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:authentication_example/app/app.dart';
import 'package:flutterfall_authentication/authentication.dart';

class App extends StatelessWidget {

  final authenticationRepository = FirebaseAuthenticationRepository();

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider.value(
      value: authenticationRepository,
      child: BlocProvider(
        create: (context) => AppCubit(authenticationRepository: authenticationRepository),
        child: AppView(),
      )
    );
  }
}
