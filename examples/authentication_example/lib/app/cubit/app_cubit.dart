import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:flutterfall_authentication/authentication.dart';

part 'app_state.dart';

class AppCubit extends Cubit<AppState> {

  final IAuthenticationRepository authenticationRepository;

  AppCubit({
    required this.authenticationRepository
  }) : super(AppState.loading()) {
    emit(_mapAccountToState(authenticationRepository.currentAccount));
    authenticationRepository.stream.listen((account) { 
      emit(_mapAccountToState(account));
    });
  }

  AppState _mapAccountToState(Account account) {
    if(account.isEmpty) {
      return AppState.unauthenticated();
    }
    else {
      return AppState.authenticated(account);
    }
  }
}