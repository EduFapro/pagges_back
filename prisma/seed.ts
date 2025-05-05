/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword1 = await bcrypt.hash('password1', 10)
  const hashedPassword2 = await bcrypt.hash('password2', 10)
  const hashedPassword3 = await bcrypt.hash('password3', 10)

  const users = await prisma.user.createMany({
    data: [
      {
        name: 'Alice',
        username: 'alice123',
        email: 'alice@example.com',
        password: hashedPassword1,
        points: 100,
        pages: 200,
        is_author: false,
        profile_image: fs.readFileSync(
          path.join(__dirname, '../src/assets', 'kermit_o_sapo.jpeg'),
        ),
        biography:
          'Leitora apaixonada por ficção científica e fantasia. Sempre em busca de novas histórias para explorar.',
      },
      {
        name: 'Bob',
        username: 'bob456',
        email: 'bob@example.com',
        password: hashedPassword2,
        points: 80,
        pages: 150,
        is_author: true,
        biography:
          'Escritor e crítico literário com mais de 10 anos de experiência. Apaixonado por ficção científica e fantasia, já publicou três livros best-sellers.',
      },
      {
        name: 'Carol',
        username: 'carol789',
        email: 'carol@example.com',
        password: hashedPassword3,
        points: 60,
        pages: 100,
        is_author: false,
        biography:
          'Leitora voraz e amante de histórias. Sempre em busca de novos mundos e aventuras literárias.',
      },
    ],
  })

  const createdUsers = await prisma.user.findMany()

  await prisma.userFollow.createMany({
    data: [
      {
        follower_id: createdUsers[0].user_id,
        following_id: createdUsers[1].user_id,
      },
      {
        follower_id: createdUsers[1].user_id,
        following_id: createdUsers[2].user_id,
      },
    ],
  })

  const books = await prisma.book.createMany({
    data: [
      {
        book_id: 1,
        isbn: 1111111111,
        title: 'Clean Code',
        genre: 'Tech',
        cover: 'https://example.com/cleancode.jpg',
        synopsis: 'A guide to writing clean code.',
        year: 2008,
        pages: 464,
        authors: 'Robert C. Martin',
      },
      {
        book_id: 2,
        isbn: 2222222222,
        title: 'The Hobbit',
        genre: 'Fantasy',
        cover: 'https://example.com/hobbit.jpg',
        synopsis: 'A hobbit goes on an adventure.',
        year: 1937,
        pages: 310,
        authors: 'J.R.R. Tolkien',
      },
      {
        book_id: 3,
        isbn: 3333333333,
        title: '1984',
        genre: 'Dystopian',
        cover: 'https://example.com/1984.jpg',
        synopsis: 'A chilling dystopian future.',
        year: 1949,
        pages: 328,
        authors: 'George Orwell',
      },
    ],
  })

  const createdBooks = await prisma.book.findMany()

  const postData = [
    {
      user_id: createdUsers[0].user_id,
      book_id: 1,
      title: 'Loved Clean Code',
      text: 'One of the best books about software craftsmanship.',
      is_spoiler: false,
      is_review: true,
      parent_id: null,
    },
    {
      user_id: createdUsers[1].user_id,
      book_id: 2,
      title: 'Bilbo Rocks!',
      text: 'I love how Bilbo becomes brave.',
      is_spoiler: false,
      is_review: true,
      parent_id: null,
    },
    {
      user_id: createdUsers[2].user_id,
      book_id: 3,
      title: 'Scary but good',
      text: '1984 is a warning we all should read.',
      is_spoiler: false,
      is_review: true,
      parent_id: null,
    },
  ]

  const posts = await prisma.post.createMany({ data: postData })

  const createdPosts = await prisma.post.findMany()

  await prisma.post.create({
    data: {
      user_id: createdUsers[1].user_id,
      book_id: 1,
      title: 'Comment on Clean Code',
      text: 'I agree, Clean Code is amazing!',
      is_spoiler: false,
      is_review: false,
      parent_id: 1,
    },
  })

  for (let i = 0; i < 2; i++) {
    const challenge = await prisma.challenge.create({
      data: {
        points: 10 + i * 5,
        question: `What is the main idea of Book ${i + 1}?`,
        alternatives: {
          create: [
            { question: 'Correct Answer', is_correct: true },
            { question: 'Wrong Answer 1', is_correct: false },
            { question: 'Wrong Answer 2', is_correct: false },
          ],
        },
      },
    })

    await prisma.challengeUser.create({
      data: {
        user_id: createdUsers[0].user_id,
        challenge_id: challenge.challenge_id,
      },
    })
  }

  await prisma.genre.createMany({
    data: [
      { genre_name: 'Fantasy' },
      { genre_name: 'Science Fiction' },
      { genre_name: 'Dystopian' },
      { genre_name: 'Technology' },
    ],
  })
  const createdGenres = await prisma.genre.findMany()

  await prisma.userGenre.createMany({
    data: [
      {
        user_id: createdUsers[0].user_id,
        genre_id: createdGenres[0].genre_id,
      },
      {
        user_id: createdUsers[0].user_id,
        genre_id: createdGenres[1].genre_id,
      },
      {
        user_id: createdUsers[0].user_id,
        genre_id: createdGenres[2].genre_id,
      },
    ],
  })

  await prisma.postLike.createMany({
    data: [
      { user_id: createdUsers[0].user_id, post_id: createdPosts[0].post_id },
      { user_id: createdUsers[0].user_id, post_id: createdPosts[1].post_id },
      { user_id: createdUsers[1].user_id, post_id: createdPosts[1].post_id },
      { user_id: createdUsers[2].user_id, post_id: createdPosts[2].post_id },
    ],
  })

  await prisma.rateBook.createMany({
    data: [
      {
        user_id: createdUsers[0].user_id,
        book_id: createdBooks[0].book_id,
        rating: 5,
      },
      {
        user_id: createdUsers[1].user_id,
        book_id: createdBooks[1].book_id,
        rating: 4,
      },
      {
        user_id: createdUsers[2].user_id,
        book_id: createdBooks[2].book_id,
        rating: 3,
      },
    ],
  })

  await prisma.userBookshelfState.createMany({
    data: [
      {
        user_id: createdUsers[0].user_id,
        book_id: createdBooks[0].book_id,
        state: 'READ',
      },
      {
        user_id: createdUsers[1].user_id,
        book_id: createdBooks[1].book_id,
        state: 'READING',
      },
      {
        user_id: createdUsers[2].user_id,
        book_id: createdBooks[2].book_id,
        state: 'TO_BE_READ',
      },
    ],
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect()
  })
