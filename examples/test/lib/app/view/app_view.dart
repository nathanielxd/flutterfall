import 'package:flutter/material.dart';
import 'package:test/app/app.dart';

class AppView extends StatelessWidget {

  AppView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'rainwater',
      home: Scaffold()
    );
  }
}