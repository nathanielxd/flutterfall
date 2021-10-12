import 'dart:math';

import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';

part 'counter_state.dart';

class CounterCubit extends Cubit<CounterState> {

  CounterCubit() : super(CounterState());

  /// Increase the counter count by 1.
  void increase() => emit(state.copyWith(count: state.count + 1));
  /// Decrease the counter count by 1.
  void decrease() => emit(state.copyWith(count: state.count - 1));
  /// Change the color of the counter by randomising the color index. Values range from 0 inclusive to 4 inclusive.
  void randomizeColor() => emit(state.copyWith(colorIndex: Random().nextInt(7)));
}