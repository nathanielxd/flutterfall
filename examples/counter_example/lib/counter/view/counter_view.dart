import 'package:flutter/material.dart';
import 'package:counter/counter/counter.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:rainwater_theme/theme.dart';

class CounterView extends StatelessWidget {

  const CounterView({Key? key}) : super(key: key);

  static const _colors = const[Colors.red, Colors.blue, Colors.green, Colors.purple, Colors.grey, Colors.cyan, Colors.amber];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Center(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                Center(
                  child: Text('Rainwater Counter', style: Theme.of(context).textTheme.headline3)
                ),
                Spacer(),
                BlocBuilder<CounterCubit, CounterState>(
                  builder: (context, state) {
                    return Material(
                      elevation: 5,
                      borderRadius: BorderRadius.circular(10),
                      color: _colors.map((e) => e.shade300).toList()[state.colorIndex],
                      child: Padding(
                        padding: const EdgeInsets.all(20),
                        child: Center(
                          child: Text(state.count.toString(), style: Theme.of(context).textTheme.headline1)
                        )
                      )
                    );
                  },
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(vertical: 10),
                  child: Row(
                    children: [
                      Expanded(
                        child: RainwaterPrimaryButton(
                          label: Text('Decrement -'), 
                          onTap: () => context.read<CounterCubit>().decrease()
                        )
                      ),
                      SizedBox(width: 10),
                      Expanded(
                        child: RainwaterPrimaryButton(
                          label: Text('Increment +'), 
                          onTap: () => context.read<CounterCubit>().increase()
                        ),
                      ),
                    ]
                  )
                ),
                BlocBuilder<CounterCubit, CounterState>(
                  builder: (context, state) {
                    return RainwaterPrimaryButton(
                      backgroundColor: _colors.map((e) => e.shade700).toList()[state.colorIndex],
                      label: Text('Change Colour'), 
                      onTap: () => context.read<CounterCubit>().randomizeColor()
                    );
                  }
                ),
                Spacer(),
              ]
            )
          )
        )
      )
    );
  }
}