import 'dart:async';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterfall_authentication/authentication.dart';

part 'profile_state.dart';

class ProfileCubit extends Cubit<Account> {

  final IAuthenticationRepository authenticationRepository;

  ProfileCubit({
    required this.authenticationRepository
  }) : super(Account.empty) {
    emit(authenticationRepository.currentAccount);
    authenticationRepository.stream.listen((account) => emit(account));
  }

  void logout() async => await authenticationRepository.logout();
}