class Ability
  include CanCan::Ability

  def initialize(user)
	  user ||= User.new # guest user

    if user.role? :admin
      can :manage, :all
	  else
      can :manage, :display
      cannot :index, User
      cannot :index, Entry
      can :create, User
      can :create, Entry
      #cannot :index, :admin
	  end
  end

end
