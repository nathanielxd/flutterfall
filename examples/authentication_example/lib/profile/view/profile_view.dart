import 'package:flutter/material.dart';
import 'package:authentication_example/profile/profile.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutterfall_authentication/authentication.dart';
import 'package:flutterfall_theme/theme.dart';

class ProfileView extends StatelessWidget {

  ProfileView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Text('Profile', style: Theme.of(context).textTheme.headline3),
              Spacer(),
              BlocBuilder<ProfileCubit, Account>(
                builder: (context, state) {
                  return Container(
                    padding: const EdgeInsets.all(20),
                    child: Column(
                      children: [
                        Text('#${state.id}', 
                          style: TextStyle(
                            fontWeight: FontWeight.w700
                          )
                        ),
                        Text(state.email, 
                          style: TextStyle(
                            fontWeight: FontWeight.w700
                          )
                        ),
                        Text(state.emailVerified ? 'Email has been verified.' : 'Email has not been verified.', 
                          style: TextStyle(
                            color: state.emailVerified ? Colors.green : Colors.red
                          )
                        )
                      ]
                    )
                  );
                }
              ),
              Spacer(),
              FlutterfallPrimaryButton(
                label: Text('Log out'), 
                onTap: () => context.read<ProfileCubit>().logout()
              )
            ]
          ),
        )
      )
    );
  }
}