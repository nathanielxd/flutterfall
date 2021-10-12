import 'package:counter/counter/counter.dart';
import 'package:flutter/material.dart';
import 'package:counter/app/app.dart';
import 'package:rainwater_theme/theme.dart';

class AppView extends StatelessWidget {

  AppView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'rainwater',
      theme: RainwaterThemes.light,
      home: CounterPage()
    );
  }
}