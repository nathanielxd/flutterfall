part of 'app_cubit.dart';

enum AppStatus {loading, unauthenticated, authenticated}

class AppState extends Equatable {

  final AppStatus status;
  final Account account;

  AppState._({
    required this.status,
    this.account = Account.empty,
  });

  factory AppState.loading() 
  => AppState._(
    status: AppStatus.loading
  );

  factory AppState.unauthenticated() 
  => AppState._(
    status: AppStatus.unauthenticated
  );

  factory AppState.authenticated(Account account) 
  => AppState._(
    status: AppStatus.authenticated, 
    account: account
  );

  AppState copyWith({
    AppStatus? status,
    Account? account,
  }) {
    return AppState._(
      status: status ?? this.status,
      account: account ?? this.account,
    );
  }

  @override
  List<Object> get props => [status, account];
}
