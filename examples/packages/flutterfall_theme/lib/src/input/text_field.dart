import 'package:flutter/material.dart';

class FlutterfallTextField extends StatelessWidget {

  final String? labelText;
  final String? hintText;
  final String? errorText;
  final TextEditingController? controller;
  final FocusNode? focusNode;
  final String? initialValue;
  final void Function()? onTap;
  final void Function(String)? onChanged;
  final TextInputType? keyboardType;
  final void Function(String)? onFieldSubmitted;
  final TextInputAction? textInputAction;
  final bool obscureText;
  final int? minLines;
  final int? maxLines;

  const FlutterfallTextField({
    this.labelText,
    this.hintText,
    this.errorText,
    this.controller,
    this.focusNode,
    this.initialValue,
    this.onTap,
    this.onChanged,
    this.keyboardType,
    this.onFieldSubmitted,
    this.textInputAction,
    this.obscureText = false,
    this.minLines,
    this.maxLines = 1
  });

  @override
  Widget build(BuildContext context) {
    return Material(
      color: Colors.grey[200],
      borderRadius: BorderRadius.circular(10),
      child: Padding(
        padding: const EdgeInsets.all(10),
        child: TextFormField(
          controller: controller,
          focusNode: focusNode,
          initialValue: initialValue,
          cursorColor: Colors.grey[400],
          style: TextStyle(
            fontFamily: 'Manrope'
          ),
          decoration: InputDecoration(
            contentPadding: const EdgeInsets.only(),
            floatingLabelBehavior: FloatingLabelBehavior.always,
            border: InputBorder.none,
            labelText: labelText,
            hintText: hintText,
            hintStyle: TextStyle(
              fontSize: 12,
              color: Colors.grey[800]
            ),
            errorText: errorText,
          ),
          onTap: onTap,
          onChanged: onChanged,
          keyboardType: keyboardType,
          textInputAction: textInputAction,
          onFieldSubmitted: onFieldSubmitted,
          obscureText: obscureText,
          minLines: minLines,
          maxLines: maxLines
        ),
      ),
    );
  }
}