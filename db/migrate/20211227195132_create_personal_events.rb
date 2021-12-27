class CreatePersonalEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :personal_events do |t|
      t.references :user_id, null: false, foreign_key: true
      t.string :title
      t.datetime :start
      t.datetime :end
      t.boolean :all_day
      t.string :desc
      t.string :color

      t.timestamps
    end
  end
end
