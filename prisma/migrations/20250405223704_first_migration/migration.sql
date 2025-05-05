-- CreateTable
CREATE TABLE "user_seguindo" (
    "follower_id" INTEGER NOT NULL,
    "following_id" INTEGER NOT NULL,

    CONSTRAINT "user_seguindo_pkey" PRIMARY KEY ("follower_id","following_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "points" INTEGER,
    "pages" INTEGER,
    "is_author" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "book" (
    "book_id" INTEGER NOT NULL,
    "isbn" BIGINT,
    "title" VARCHAR(255),
    "genre" VARCHAR(255),
    "cover" VARCHAR(1000),
    "synopsis" VARCHAR(1000),
    "year" INTEGER,
    "pages" INTEGER,
    "authors" VARCHAR(255),

    CONSTRAINT "book_pkey" PRIMARY KEY ("book_id")
);

-- CreateTable
CREATE TABLE "post" (
    "post_id" SERIAL NOT NULL,
    "book_id" INTEGER NOT NULL,
    "isbn" BIGINT,
    "user_id" INTEGER NOT NULL,
    "is_spoiler" BOOLEAN NOT NULL DEFAULT false,
    "title" VARCHAR(255),
    "text" VARCHAR(1000) NOT NULL,
    "is_comment" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "post_pkey" PRIMARY KEY ("post_id")
);

-- CreateTable
CREATE TABLE "challenge" (
    "challenge_id" SERIAL NOT NULL,
    "points" INTEGER NOT NULL,
    "question" VARCHAR(255) NOT NULL,

    CONSTRAINT "challenge_pkey" PRIMARY KEY ("challenge_id")
);

-- CreateTable
CREATE TABLE "challenge_user" (
    "user_id" INTEGER NOT NULL,
    "challenge_id" INTEGER NOT NULL,

    CONSTRAINT "challenge_user_pkey" PRIMARY KEY ("user_id","challenge_id")
);

-- CreateTable
CREATE TABLE "alternative" (
    "alternative_id" SERIAL NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "question" VARCHAR(255) NOT NULL,
    "challenge_id" INTEGER NOT NULL,

    CONSTRAINT "alternative_pkey" PRIMARY KEY ("alternative_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "user_seguindo" ADD CONSTRAINT "user_seguindo_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_seguindo" ADD CONSTRAINT "user_seguindo_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "book"("book_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_user" ADD CONSTRAINT "challenge_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_user" ADD CONSTRAINT "challenge_user_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alternative" ADD CONSTRAINT "alternative_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenge"("challenge_id") ON DELETE RESTRICT ON UPDATE CASCADE;
