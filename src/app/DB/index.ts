import config from "../config";
import prisma from "../utils/prisma";
import bcrypt from "bcrypt";

const seedSuperAdmin = async () => {
  const hashedPassword = await bcrypt.hash(
    config.super_admin_password as string,
    Number(config.bcrypt_salt_rounds),
  );

  const superUser = {
    name: config.super_admin_name as string,
    email: config.super_admin_email as string,
    username: config.super_admin_username as string,
    password: hashedPassword,
    role: "super-admin" as string,
  };

  const checkSuperAdminExists = await prisma.user.findFirst({
    where: {
      role: "super-admin",
    },
  });
  if (!checkSuperAdminExists) {
    await prisma.user.create({
      data: superUser,
    });
  }
};

export default seedSuperAdmin;
