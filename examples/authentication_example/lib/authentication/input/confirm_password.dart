import 'package:formz/formz.dart';

class ConfirmPasswordInput extends FormzInput<String, String> {

  final String password;

  const ConfirmPasswordInput.pure(this.password) : super.pure('');
  const ConfirmPasswordInput.dirty([String value = '', this.password = '']) : super.dirty(value);

  @override
  String? validator(String? value) {
    if(value == null || value.isEmpty) return 'Cannot be empty.';
    if(password.compareTo(value) != 0) return 'Passwords do not match.';
    return null;
  }
}