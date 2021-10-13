import 'package:flutter/material.dart';

class FlutterfallPrimaryButton extends StatelessWidget {

  final Text label;
  final void Function() onTap;
  final Color? backgroundColor;
    
  /// A button that is filled with Theme's primary color, has rounded corners of 10px, inner padding of 10px and elevation of 5.
  const FlutterfallPrimaryButton({ 
    Key? key,
    required this.label,
    required this.onTap,
    this.backgroundColor
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Material(
      color: backgroundColor ?? Theme.of(context).primaryColor,
      borderRadius: BorderRadius.circular(10),
      elevation: 5,
      child: InkWell(
        borderRadius: BorderRadius.circular(10),
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: DefaultTextStyle.merge(
            style: TextStyle(
              color: Colors.white,
              fontSize: 16,
              fontWeight: FontWeight.w700,
            ),
            child: Center(
              child: label
            )
          )
        ),
      ),
    );
  }
}