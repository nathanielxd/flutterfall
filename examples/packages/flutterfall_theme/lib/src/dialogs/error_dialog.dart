import 'package:flutter/material.dart';

class FlutterfallErrorDialog extends StatelessWidget {

  final String? message;
  const FlutterfallErrorDialog([this.message]);

  @override
  Widget build(BuildContext context) {
    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: BorderSide(
          color: Colors.red[800]!,
          width: 2
        )
      ),
      child: Padding(
        padding: const EdgeInsets.all(20),
        child: Text(message ?? 'An unexpected error has occured.'),
      )
    );
  }
}