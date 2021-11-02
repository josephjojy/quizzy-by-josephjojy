require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(first_name: "Sam",
                     last_name: "Smith",
                     email: "sam@example.com")
  end

  def test_user_should_be_valid
    assert @user.valid?
  end

  def test_first_name_should_be_present
    @user.first_name = ""
    assert @user.invalid?
  end

  def test_last_name_should_be_present
    @user.last_name = ""
    assert @user.invalid?
  end

  def test_email_should_be_present
    @user.email = ""
    assert @user.invalid?
  end

  def test_first_name_should_be_of_valid_length
    @user.first_name = "a" * 51
    assert @user.invalid?
  end

  def test_email_should_be_unique
    @user.save!
    test_user = @user.dup
    assert test_user.invalid?
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
  end

  def test_email_should_be_unique_irresrpective_of_letter_case
    uppercase_email = "SAM@example.com"
    test_user = @user.dup
    test_user.email = uppercase_email
    test_user.save!
    assert @user.invalid?
  end

end
