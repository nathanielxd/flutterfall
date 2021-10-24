import 'package:flutter/material.dart';
import 'package:authentication_example/profile/profile.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterfall_authentication/authentication.dart';

class ProfilePage extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
		return BlocProvider(
      create: (_) => ProfileCubit(authenticationRepository: context.read<FirebaseAuthenticationRepository>()),
      child: ProfileView()
    );
  }
}
  