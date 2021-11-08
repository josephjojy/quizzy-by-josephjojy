# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(
      first_name: "Sam",
      last_name: "Smith",
      email: "sam@example.com",
      password: "helloworld",
      password_confirmation: "helloworld",
      role: "administrator")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = ""
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "First name can't be blank"
  end

  def test_last_name_should_be_present
    @user.last_name = ""
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Last name can't be blank"
  end

  def test_email_should_be_present
    @user.email = ""
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Email can't be blank"
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 51
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "First name is too long (maximum is 50 characters)"
  end

  def test_last_name_should_be_of_valid_length
    @user.last_name = "a" * 51
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Last name is too long (maximum is 50 characters)"
  end

  def test_email_should_be_unique
    @user.save!
    test_user = @user.dup
    assert test_user.invalid?
    assert_includes test_user.errors.full_messages, "Email has already been taken"
  end

  def test_email_address_should_be_saved_as_lowercase
    uppercase_email = "SAM@EMAIL.COM"
    @user.email = uppercase_email
    @user.save!
    assert_equal uppercase_email.downcase, @user.email
  end

  def test_email_validation_should_accept_valid_addresses
    valid_emails = %w[user@example.com USER@example.COM US-ER@example.org
        first.last@example.in user+one@example.ac.in]

    valid_emails.each do |email|
        @user.email = email
        assert @user.valid?
      end
  end

  def test_email_validation_should_reject_invalid_addresses
    invalid_emails = %w[user@example,com user_at_example.org user.name@example.
      @sam-sam.com sam@sam+exam.com fishy+#.com]

    invalid_emails.each do |email|
      @user.email = email
      assert @user.invalid?
    end
    assert_includes @user.errors.full_messages, "Email is invalid"
  end

  def test_email_should_be_unique_irresrpective_of_letter_case
    uppercase_email = "SAM@example.com"
    test_user = @user.dup
    test_user.email = uppercase_email
    test_user.save!
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Email has already been taken"
  end

  def test_user_should_have_a_valid_role
    assert_equal @user.role, "administrator"
    assert @user.valid?
    @user.role = "standard"
    assert @user.valid?
  end

  def test_password_cant_be_blank
    @user.password = nil
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password can't be blank"
  end

  def test_password_should_have_minimum_length
    @user.password = "a" * 4
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password is too short (minimum is 6 characters)"
  end

  def test_password_and_password_confirmation_should
    @user.password_confirmation = "#{@user.password}-random"
    assert_not @user.save
    assert_includes @user.errors.full_messages, "Password confirmation doesn't match Password"
  end

  def test_password_confirmation_cant_be_blank
    @user.password_confirmation = nil
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation can't be blank"
  end

  def test_password_confirmation_should_have_minimum_length
    @user.password_confirmation = "a" * 4
    assert @user.invalid?
    assert_includes @user.errors.full_messages, "Password confirmation is too short (minimum is 6 characters)"
  end
end
