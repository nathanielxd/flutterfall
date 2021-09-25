import 'dart:async';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc extends Bloc<AuthenticationEvent, AuthenticationState> {

  AuthenticationBloc() : super(AuthenticationState());

  @override
  Stream<AuthenticationState> mapEventToState(AuthenticationEvent event) async* {
    // TODO: implement mapEventToState
  }
}