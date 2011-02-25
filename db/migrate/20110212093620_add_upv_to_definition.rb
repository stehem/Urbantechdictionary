class AddUpvToDefinition < ActiveRecord::Migration
  def self.up
    add_column :definitions, :upv, :integer, :default => 0
    add_column :definitions, :dwv, :integer, :default => 0
  end

  def self.down
    remove_column :definitions, :upv
  end
end
