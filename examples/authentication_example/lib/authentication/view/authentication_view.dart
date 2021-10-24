import 'package:authentication_example/login/login.dart';
import 'package:authentication_example/signup/view/signup_page.dart';
import 'package:flutter/material.dart';
import 'package:authentication_example/authentication/authentication.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterfall_theme/theme.dart';
import 'package:formz/formz.dart';

class AuthenticationView extends StatelessWidget {

  const AuthenticationView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: BlocConsumer<AuthenticationCubit, AuthenticationState>(
          listenWhen: (previous, current) => previous.status != current.status || previous.errorMessage != current.errorMessage,
          listener: (context, state) {
            switch(state.status) {
              case FormzStatus.submissionInProgress:
                // TODO: Handle this case.
                break;
              case FormzStatus.submissionFailure:
                showDialog(context: context, builder: (_) => FlutterfallErrorDialog(state.errorMessage));
                break;
              default:
                break;
            }
          },
          buildWhen: (previous, current) => previous.index != current.index,
          builder: (context, state) {
            return AnimatedSwitcher(
              duration: Duration(milliseconds: 300),
              child: [
                LoginPage(),
                SignupPage()
              ][state.index],
            );
          },
        )
      )
    );
  }
}