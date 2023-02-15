db.createUser({
  user: 'test_user',
  pwd: 'test_pass',
  roles: [
    {
      role: 'dbOwner',
      db: 'test_db',
    },
  ],
});