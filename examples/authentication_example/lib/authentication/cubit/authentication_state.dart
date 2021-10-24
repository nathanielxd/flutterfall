part of 'authentication_cubit.dart';

class AuthenticationState extends Equatable {

  final EmailInput email;
  final PasswordInput password;
  final ConfirmPasswordInput confirmPassword;
  final FormzStatus status;
  final int index;
  final String? errorMessage;

  AuthenticationState({
    this.email = const EmailInput.pure(),
    this.password = const PasswordInput.pure(),
    this.confirmPassword = const ConfirmPasswordInput.pure(''),
    this.status = FormzStatus.pure,
    this.index = 0,
    this.errorMessage,
  });

  AuthenticationState copyWith({
    EmailInput? email,
    PasswordInput? password,
    ConfirmPasswordInput? confirmPassword,
    FormzStatus? status,
    int? index,
    String? errorMessage,
  }) {
    return AuthenticationState(
      email: email ?? this.email,
      password: password ?? this.password,
      confirmPassword: confirmPassword ?? this.confirmPassword,
      status: status ?? this.status,
      index: index ?? this.index,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [email, password, confirmPassword, status, index, errorMessage];
}
