class RemoveDefinitionFromWord < ActiveRecord::Migration
  def self.up
    remove_column :words, :definition
  end

  def self.down
    add_column :words, :definition, :text
  end
end
