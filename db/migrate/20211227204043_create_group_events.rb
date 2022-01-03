class CreateGroupEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :group_events do |t|
      t.references :group, null: false, foreign_key: true
      t.string :title
      t.datetime :start
      t.datetime :end
      t.boolean :all_day
      t.text :desc
      t.string :color

      t.timestamps
    end
  end
end
