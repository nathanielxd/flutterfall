import 'package:formz/formz.dart';

class PasswordInput extends FormzInput<String, String> {

  const PasswordInput.pure() : super.pure('');
  const PasswordInput.dirty([String value = '']) : super.dirty(value);

  @override
  String? validator(String? value) {
    if(value == null || value.isEmpty) return 'Cannot be empty.';
    if(value.length < 8) return 'Minimum 8 characters.';
    return null;
  }
}