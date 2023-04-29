# Modal Lesson

## Getting Started

pnpm i
pnpm dev

## Database Planetscale

Planetscale does not recommend running `npx prisma db migrate` on production. Instead, use `npx prisma db push` to push the schema to the database. This will create the database if it does not exist.

If you make a change in the schema, you will need to run `npx prisma db push` again to push the schema to the database. If you receive a DDL error, create a branch in Planetscale and run `npx prisma db push` on the branch. Then, merge the branch into main.

Switch back to the main DB branch and run `npx prisma generate`

Note: Work in progress as I'm learning the ins and outs of PS.

## Testing
