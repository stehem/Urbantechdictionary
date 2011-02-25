class AddPosterToDefinition < ActiveRecord::Migration
  def self.up
    add_column :definitions, :poster, :string
  end

  def self.down
    remove_column :definitions, :poster
  end
end
