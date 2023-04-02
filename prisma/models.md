<!-- This page is for the ideas for the Schemas -->

# Schemas for the Prisma

## Words
- This schema is for the words that are used in the game, it should have the words, category [relation], tags[relation], and the difficulty of the word, length, language, also when the word was added to the database, how many times it was used, how many times was right guessed, and the last time it was used.

#### Schema
- id: ID! @id
- word: String!
- active: Boolean!
- category: Category @relation(fields: [categoryId], references: [id])
- categoryId: Int
- tags: [Tag] @relation(references: [id])
- difficulty: Int
- length: Int
- language: String
- addedAt: DateTime!
- used: Int
- right: Int
- lastUsed: DateTime

## Categories
- This schema is for the categories of the words, it should have the name of the category, and the description of the category.

#### Schema
- id: ID! @id
- name: String!
- description: String
- createdAt: DateTime!
- updatedAt: DateTime!

## Tags
- This schema is for the tags of the words, it should have the name of the tag, and the description of the tag.

#### Schema
- id: ID! @id
- name: String!
- description: String
- createdAt: DateTime!
- updatedAt: DateTime!
