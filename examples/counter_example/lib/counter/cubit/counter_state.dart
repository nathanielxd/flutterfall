part of 'counter_cubit.dart';

class CounterState extends Equatable {

  final int count;
  final int colorIndex;
  
  CounterState({
    this.count = 0,
    this.colorIndex = 0
  });

  CounterState copyWith({
    int? count,
    int? colorIndex,
  }) => CounterState(
    count: count ?? this.count,
    colorIndex: colorIndex ?? this.colorIndex,
  );

  @override
  List<Object> get props => [count, colorIndex];
}
