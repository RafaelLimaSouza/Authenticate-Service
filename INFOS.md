#### Database

- User's status
  ENABLE: The user created and password changed. It's OK to system access.
  DISABLE: The user was created but It doesn't have access into of the time limit.
  PROVISIONAL: The user was created but the password not changed yet.

- IndexPassword
  In the CreateUser Step, the index begin with status false.

  ##### 1st reason

  Used to identify the first access of a new user or recovery password because the effects are distincts.

  - New user => Limit Time exceeded the user is canceled.
  - Old user => New requested necessary to recovery the password.

  ##### 2st reason

  Used to identify if the new password is equal the old password when user is already active.
