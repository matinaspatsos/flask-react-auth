from src.api.users.models import User


def test_passwords_are_random(test_app, test_database, add_user):
    user_one = add_user("justatest", "test@test.com", "greaterthaneight")
    user_two = add_user("justatest2", "test@test2.com", "greaterthaneight")
    assert user_one.password != user_two.password


def test_encode_token(test_app, test_database, add_user):
    user = add_user("justatest", "test@test.com", "test")
    token = user.encode_token(user.id, "access")
    assert isinstance(token, str)


def test_decode_access_token(test_app, test_database, add_user):
    user = add_user("justatest", "test@test.com", "test")
    token = user.encode_token(user.id, "access")
    assert isinstance(token, str)
    assert User.decode_token(token) == user.id


def test_decode_refresh_token(test_app, test_database, add_user):
    user = add_user("justatest", "test@test.com", "test")
    token = user.encode_token(user.id, "refresh")
    assert isinstance(token, str)
    assert User.decode_token(token) == user.id
