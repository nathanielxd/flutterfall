import 'package:flutter/material.dart';

class RainwaterThemes {

  static final _primaryColor = Color(0xff002e3b);

  static final light = ThemeData(
    primaryColor: _primaryColor,
    fontFamily: 'Manrope',
    textTheme: TextTheme(
      headline1: TextStyle(
        fontSize: 64,
        fontWeight: FontWeight.w700,
        color: _primaryColor
      ),
      headline3: TextStyle(
        fontSize: 32,
        fontWeight: FontWeight.w700,
        color: _primaryColor
      ),
    )
  );

}