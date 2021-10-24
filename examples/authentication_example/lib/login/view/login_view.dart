import 'package:authentication_example/authentication/authentication.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterfall_theme/theme.dart';

class LoginView extends StatelessWidget {

  LoginView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: Text('Login', style: Theme.of(context).textTheme.headline3),
              ),
              Spacer(),
              BlocBuilder<AuthenticationCubit, AuthenticationState>(
                buildWhen: (previous, current) => previous.email != current.email,
                builder: (context, state) {
                  return FlutterfallTextField(
                    labelText: 'Email',
                    errorText: state.email.invalid ? state.email.error : null,
                    initialValue: state.email.value,
                    onChanged: (value) => context.read<AuthenticationCubit>().emailChanged(value)
                  );
                }
              ),
              SizedBox(height: 20),
              BlocBuilder<AuthenticationCubit, AuthenticationState>(
                buildWhen: (previous, current) => previous.password != current.password,
                builder: (context, state) {
                  return FlutterfallTextField(
                    labelText: 'Password',
                    errorText: state.password.invalid ? state.password.error : null,
                    initialValue: state.password.value,
                    onChanged: (value) => context.read<AuthenticationCubit>().passwordChanged(value)
                  );
                }
              ),
              Spacer(flex: 2),
              FlutterfallPrimaryButton(
                label: Text('Login'),
                onTap: () => context.read<AuthenticationCubit>().login()
              ),
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Do not have account? '),
                  GestureDetector(
                    child: Text('Register instead', 
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.w700
                      )
                    ),
                    onTap: () => context.read<AuthenticationCubit>().indexChanged(1)
                  )
                ],
              )
            ]
          ),
        )
      )
    );
  }
}