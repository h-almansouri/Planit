class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name
      t.string :password
      t.date :birthday
      t.string :profile_picture
      t.text :bio

      t.timestamps
    end
  end
end
