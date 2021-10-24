import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:authentication_example/authentication/authentication.dart';
import 'package:flutterfall_theme/theme.dart';

class SignupView extends StatelessWidget {

  SignupView({Key? key}) : super(key: key);

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
                child: Text('Sign Up', style: Theme.of(context).textTheme.headline3),
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
              SizedBox(height: 20),
              BlocBuilder<AuthenticationCubit, AuthenticationState>(
                buildWhen: (previous, current) => previous.confirmPassword != current.confirmPassword,
                builder: (context, state) {
                  return FlutterfallTextField(
                    labelText: 'Confirm Password',
                    errorText: state.confirmPassword.invalid ? state.confirmPassword.error : null,
                    initialValue: state.confirmPassword.value,
                    onChanged: (value) => context.read<AuthenticationCubit>().confirmPasswordChanged(value)
                  );
                }
              ),
              Spacer(flex: 2),
              FlutterfallPrimaryButton(
                label: Text('Register'),
                onTap: () => context.read<AuthenticationCubit>().register()
              ),
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text('Already have account? '),
                  GestureDetector(
                    child: Text('Login instead', 
                      style: TextStyle(
                        color: Theme.of(context).primaryColor,
                        fontWeight: FontWeight.w700
                      )
                    ),
                    onTap: () => context.read<AuthenticationCubit>().indexChanged(0)
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