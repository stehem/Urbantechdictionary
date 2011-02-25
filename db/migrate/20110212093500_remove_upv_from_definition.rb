class RemoveUpvFromDefinition < ActiveRecord::Migration
  def self.up
    remove_column :definitions, :upv
    remove_column :definitions, :dwv
  end

  def self.down
    add_column :definitions, :upv, :integer
  end
end
