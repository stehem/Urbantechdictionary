class CreateDefinitions < ActiveRecord::Migration
  def self.up
    create_table :definitions do |t|
      t.integer :word_id
      t.text :definition
      t.integer :upv
      t.integer :dwv

      t.timestamps
    end
  end

  def self.down
    drop_table :definitions
  end
end
