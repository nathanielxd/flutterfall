import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:authentication_example/app/app.dart';
import 'package:authentication_example/authentication/authentication.dart';
import 'package:authentication_example/profile/profile.dart';
import 'package:flutterfall_theme/theme.dart';

class AppView extends StatelessWidget {

  AppView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'flutterfall',
      theme: FlutterfallThemes.light,
      home: BlocBuilder<AppCubit, AppState>(
        builder: (context, state) {
          switch(state.status) {
            case AppStatus.loading:
              return _buildLoading();
            case AppStatus.authenticated:
              return ProfilePage();
            case AppStatus.unauthenticated:
              return AuthenticationPage();
          }
        }
      )
    );
  }

  Widget _buildLoading()
  => Scaffold(
    body: Center(
      child: SizedBox(
        height: 80,
        width: 80,
        child: CircularProgressIndicator()
      )
    )
  );
}