const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const username = 'bluury';
  const password = 'bluuryadmin2026!';

  // Varsa eski admini silip yenisini oluşturalım veya kontrol edelim
  const existingAdmin = await prisma.admin.findUnique({
    where: { username }
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    console.log(`✅ Özel Admin oluşturuldu! Kullanıcı adı: ${username} | Şifre: ${password}`);
  } else {
    // Şifreyi güncelleyelim
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.update({
      where: { username },
      data: { password: hashedPassword }
    });
    console.log(`✅ Özel Admin şifresi güncellendi! Kullanıcı adı: ${username} | Şifre: ${password}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
