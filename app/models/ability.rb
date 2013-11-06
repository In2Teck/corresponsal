class Ability
  include CanCan::Ability

  def initialize(user)
	  user ||= User.new # guest user

    if user.role? :admin
      can :manage, :all
	  else
      can :manage, :display
      can :manage, :entries
      can :manage, :users
      cannot :manage, :admin
      cannot :index, :entries
      cannot :index, :users
	  end
  end

end
