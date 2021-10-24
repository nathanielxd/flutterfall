import 'package:authentication_example/authentication/authentication.dart';
import 'package:flutterfall_authentication/authentication.dart';
import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:formz/formz.dart';

part 'authentication_state.dart';

class AuthenticationCubit extends Cubit<AuthenticationState> {
  
  final IAuthenticationRepository authenticationRepository;

  AuthenticationCubit({
    required this.authenticationRepository
  }) : super(AuthenticationState());

  void emailChanged(String value) {
    final email = EmailInput.dirty(value);
    emit(state.copyWith(email: email, status: Formz.validate([email, state.password])));
  }

  void passwordChanged(String value) {
    final password = PasswordInput.dirty(value);
    final confirmPassword = ConfirmPasswordInput.dirty(state.confirmPassword.value, password.value);
    emit(state.copyWith(password: password, confirmPassword: confirmPassword, status: Formz.validate([state.email, password])));
  }

  void confirmPasswordChanged(String value) {
    final confirmPassword = ConfirmPasswordInput.dirty(value, state.password.value);
    emit(state.copyWith(confirmPassword: confirmPassword, status: Formz.validate([state.email, state.password, confirmPassword])));
  }

  void indexChanged(int value) => emit(state.copyWith(index: value));

  void login() async {
    final status = Formz.validate([state.email, state.password]);
    if(!status.isValid) return;
    try {
      emit(state.copyWith(status: FormzStatus.submissionInProgress));
      await authenticationRepository.loginWithEmail(state.email.value, state.password.value);
      emit(state.copyWith(status: FormzStatus.submissionSuccess));
    }
    on AuthenticationException catch(e) {
      emit(state.copyWith(status: FormzStatus.submissionFailure, errorMessage: e.message));
    }
    catch(e) {
      emit(state.copyWith(status: FormzStatus.submissionFailure, errorMessage: 'An error has occured.'));
    }
  }

  void register() async {
    final status = Formz.validate([state.email, state.password, state.confirmPassword]);
    if(!status.isValid) return;
    try {
      emit(state.copyWith(status: FormzStatus.submissionInProgress));
      await authenticationRepository.registerWithEmail(state.email.value, state.password.value);
      emit(state.copyWith(status: FormzStatus.submissionSuccess));
    }
    on AuthenticationException catch(e) {
      emit(state.copyWith(status: FormzStatus.submissionFailure, errorMessage: e.message));
    }
    catch(e) {
      emit(state.copyWith(status: FormzStatus.submissionFailure, errorMessage: 'An error has occured.'));
    }
  }
}
