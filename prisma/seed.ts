import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      {
        code: 'ADMIN'
      },
      {
        code: 'TEACHER'
      },
      {
        code: 'PARENT'
      },
      {
        code: 'STUDENT'
      }
    ],
    skipDuplicates: true,
  })
  console.log({ roles })

  const admin_role = await prisma.role.findUnique({ where: { code: "ADMIN" } });
  console.log('========= Admin Role ================' , admin_role);

  if (admin_role) {
    const admin = await prisma.user.create({
      data: {
        phone_status: "VERIFIED",
        email: "admin@alas.com",
        password: bcrypt.hashSync("password", 10),
        gender: "MALE",
        profile_picture: "https://res.cloudinary.com/dh4lnup4h/image/upload/v1668985231/qac/ce5kbkufz4hkpsw6pw3s.png",
        dateOfBirth: new Date('2023-01-23'),
        first_name: "Application",
        last_name: "Admin",
        status: 'PUBLIC',
        stripe_customerId:"",
        roleId: admin_role.id,
      }
    })
    console.log('=========Super Admin================');
    console.log(admin);
    console.log('====================================');
  }

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })